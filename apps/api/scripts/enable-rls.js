const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching public tables...');
  const tables = await prisma.$queryRaw`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  `;

  console.log(`Found ${tables.length} tables in public schema.`);

  for (const table of tables) {
    const tableName = table.tablename;
    console.log(`Enabling RLS on table: ${tableName}`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "${tableName}" ENABLE ROW LEVEL SECURITY;`);
  }

  console.log(
    'RLS enabled on all public tables. Since there are no permissive policies, these tables are now inaccessible via the Supabase Data API (PostgREST), which secures them from unauthorized public access.',
  );
}

main()
  .catch((e) => {
    console.error('Error enabling RLS:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
