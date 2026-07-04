const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const queries = [
      'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, service_role, authenticator;',
      'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres, service_role, authenticator;',
      'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated;',
    ];

    for (const q of queries) {
      await prisma.$executeRawUnsafe(q);
      console.log('Executed:', q);
    }
    console.log('Successfully expanded default privileges for all future tables.');
  } catch (e) {
    console.error('Database Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
