const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.$queryRawUnsafe(`SELECT * FROM public."users" LIMIT 1`);
    console.log('User query success. Number of users:', users.length);
  } catch (e) {
    console.error('Database Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
