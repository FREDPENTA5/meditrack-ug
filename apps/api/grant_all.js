const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const queries = [
      'GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role, authenticator;',
      'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres, service_role, authenticator;',
      'GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres, service_role, authenticator;',
      'GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon, authenticated;',
    ];

    for (const q of queries) {
      await prisma.$executeRawUnsafe(q);
      console.log('Executed:', q);
    }
    console.log('Successfully expanded privileges for all standard Supabase roles.');
  } catch (e) {
    console.error('Database Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
