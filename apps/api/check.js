const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const columns = await prisma.$queryRawUnsafe(
    "SELECT column_name FROM information_schema.columns WHERE table_name = 'users' AND table_schema = 'public'",
  );
  console.log(
    'users columns:',
    columns.map((c) => c.column_name),
  );
  try {
    const user = await prisma.user.findUnique({ where: { email: 'pharmacist@gayaza.ug' } });
    console.log('User query success:', user);
  } catch (e) {
    console.log('User query error:', e.message);
  }
}
main().finally(() => prisma.$disconnect());
