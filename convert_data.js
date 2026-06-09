const fs = require('fs');
const crypto = require('crypto');

const inputFile = './supabase/local_data_seed.sql';
const outputFile = './supabase/final_supabase_seed.sql';

let sql = fs.readFileSync(inputFile, 'utf-8');

// 1. Map CUIDs to UUIDs
const cuidRegex = /'c[a-z0-9]{24}'/g;
const matches = sql.match(cuidRegex) || [];
const uniqueCuids = [...new Set(matches)];

const cuidToUuid = {};
uniqueCuids.forEach((cuidWithQuotes) => {
  const uuid = crypto.randomUUID();
  cuidToUuid[cuidWithQuotes] = `'${uuid}'`;
});

// Replace all CUIDs in the SQL
for (const [cuid, uuid] of Object.entries(cuidToUuid)) {
  sql = sql.replace(new RegExp(cuid, 'g'), uuid);
}

// 2. Extract User data to create auth.users inserts
// The User row from Prisma dump has: (id, email, password_hash, full_name, phone, role, facility_id, district_id, created_at, updated_at, is_active, last_login_at)
const userRegex = /INSERT INTO public\."User" VALUES \('([^']+)', '([^']+)', '([^']+)'/g;
let authUsersSql = '-- Auto-generated auth.users inserts for migrated users\n';

let match;
while ((match = userRegex.exec(sql)) !== null) {
  const uuid = match[1];
  const email = match[2];
  const encryptedPassword = match[3];

  authUsersSql += `DELETE FROM auth.users WHERE email = '${email}';\n`;
  authUsersSql += `INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, created_at, updated_at) VALUES ('00000000-0000-0000-0000-000000000000', '${uuid}', 'authenticated', 'authenticated', '${email}', '${encryptedPassword}', now(), now(), now());\n`;
}

// 3. Rename tables and handle columns
const tableMap = {
  '"District"': 'districts',
  '"Facility"': 'facilities',
  '"Alert"': 'alerts',
  '"AuditLog"': 'audit_logs',
  '"Drug"': 'drugs',
  '"User"': 'users',
  '"ResupplyRequest"': 'resupply_requests',
  '"SmsLog"': 'sms_logs',
  '"StockEntry"': 'stock_entries',
  '"Threshold"': 'thresholds',
  // Note: RefreshToken is NOT included - it's a Prisma-internal table, not in our Supabase schema
};

for (const [oldName, newName] of Object.entries(tableMap)) {
  sql = sql.replace(
    new RegExp(`INSERT INTO public\\.${oldName}`, 'g'),
    `INSERT INTO public.${newName}`,
  );
}

// 4. Fix the public.users INSERT statements:
//    The Prisma dump has 12 columns: id, email, password_hash, full_name, phone, role, facility_id, district_id, created_at, updated_at, is_active, last_login_at
//    Our Supabase schema has 11 columns: id, email, full_name, phone, role, facility_id, district_id, created_at, updated_at, is_active, last_login_at
//    We must REMOVE the password_hash (3rd value) from the INSERT

const lines = sql.split('\n');

const fixedLines = lines.map((line) => {
  if (line.startsWith('INSERT INTO public.users VALUES')) {
    // Remove the password field (3rd quoted string, always starts with '$2')
    const fixed = line.replace(
      /^(INSERT INTO public\.users VALUES \('[^']+', '[^']+'), '\$2[ayb]\$[^']+',/,
      '$1,',
    );
    return fixed;
  }
  return line;
});

const fixedSql = fixedLines.join('\n');

// 5. Group INSERT statements by table so we can reorder them
const fixedLinesArr = fixedSql.split('\n');
const insertsByTable = {};

// Initialize arrays for all tables we care about
const allTables = [
  'districts',
  'drugs',
  'facilities',
  'users',
  'thresholds',
  'stock_entries',
  'alerts',
  'resupply_requests',
  'audit_logs',
  'sms_logs',
];
allTables.forEach((t) => (insertsByTable[t] = []));

for (const line of fixedLinesArr) {
  if (line.startsWith('INSERT INTO public.')) {
    const tableNameMatch = line.match(/INSERT INTO public\.([^\s]+)/);
    if (tableNameMatch) {
      const tableName = tableNameMatch[1];
      if (insertsByTable[tableName]) {
        insertsByTable[tableName].push(line);
      }
      // Skip refresh_tokens entirely
    }
  }
}

// Define the correct dependency order
const orderedTables = [
  'districts',
  'drugs',
  'facilities',
  'users',
  'thresholds',
  'stock_entries',
  'alerts',
  'resupply_requests',
  'audit_logs',
  'sms_logs',
];

// Build the ordered inserts
let insertsSql = '';
for (const table of orderedTables) {
  insertsSql += `-- Table: ${table}\n`;
  if (insertsByTable[table] && insertsByTable[table].length > 0) {
    insertsSql += insertsByTable[table].join('\n') + '\n\n';
  } else {
    insertsSql += `-- No data for ${table}\n\n`;
  }
}

// 6. Wrap everything in a transaction with FK checks disabled
// This ensures: if any row already exists it's skipped (ON CONFLICT),
// and all FK constraints are satisfied because all data is inserted atomically.
const finalSql = `-- MediTrack seed file generated from local Prisma database
-- Passwords are hashed with bcrypt. Default password for all users is: 12345678

BEGIN;

-- Temporarily disable triggers (FK checks) to allow flexible import order
SET session_replication_role = replica;

-- auth.users MUST exist before public.users (FK reference)
${authUsersSql}

-- Truncate existing data and reseed (safe because FKs are disabled)
TRUNCATE public.sms_logs, public.audit_logs, public.resupply_requests, public.alerts, public.stock_entries, public.thresholds, public.users, public.facilities, public.drugs, public.districts RESTART IDENTITY CASCADE;

${insertsSql}

-- Re-enable triggers
SET session_replication_role = DEFAULT;

COMMIT;
`;

fs.writeFileSync(outputFile, finalSql);
console.log('Successfully re-generated final_supabase_seed.sql!');

// Verify the user rows
const userLines = finalSql.split('\n').filter((l) => l.startsWith('INSERT INTO public.users'));
console.log(`\nVerification:`);
console.log(`  auth.users rows: ${(finalSql.match(/INSERT INTO auth\.users/g) || []).length}`);
console.log(`  public.users rows: ${userLines.length}`);
for (const ul of userLines) {
  const valMatch = ul.match(/VALUES \((.+)\);?$/);
  if (valMatch) {
    let depth = 0;
    let count = 1;
    for (const ch of valMatch[1]) {
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 0) count++;
    }
    const email = ul.match(/'([^']+@[^']+)'/)?.[1] || '?';
    console.log(`  ${email}: ${count} columns`);
  }
}
console.log(`  facilities rows: ${(insertsByTable['facilities'] || []).length}`);
console.log(`  drugs rows: ${(insertsByTable['drugs'] || []).length}`);
console.log(`  alerts rows: ${(insertsByTable['alerts'] || []).length}`);
console.log(`  stock_entries rows: ${(insertsByTable['stock_entries'] || []).length}`);
console.log(`  thresholds rows: ${(insertsByTable['thresholds'] || []).length}`);
console.log(`  refresh_tokens: SKIPPED (not in Supabase schema)`);
