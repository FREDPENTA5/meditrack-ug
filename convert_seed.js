const fs = require('fs');

const inputFile = './supabase/local_data_seed.sql';
const outputFile = './supabase/supabase_ready_seed.sql';

let sql = fs.readFileSync(inputFile, 'utf-8');

// Table names mapping
const tableMap = {
  '"District"': 'districts',
  '"Facility"': 'facilities',
  '"Alert"': 'alerts',
  '"AuditLog"': 'audit_logs',
  '"Drug"': 'drugs',
  '"User"': 'users',
  '"RefreshToken"': 'refresh_tokens',
  '"ResupplyRequest"': 'resupply_requests',
  '"SmsLog"': 'sms_logs',
  '"StockEntry"': 'stock_entries',
  '"Threshold"': 'thresholds',
};

// Simple replace for table names in INSERT INTO statements
for (const [oldName, newName] of Object.entries(tableMap)) {
  const regex = new RegExp(`INSERT INTO public\\.${oldName}`, 'g');
  sql = sql.replace(regex, `INSERT INTO public.${newName}`);
}

// Write the output
fs.writeFileSync(outputFile, sql);
console.log('Conversion complete. Check supabase_ready_seed.sql');
