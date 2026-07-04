const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const queries = [
      'CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);',
      'CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);',
    ];

    for (const q of queries) {
      try {
        await prisma.$executeRawUnsafe(q);
        console.log('Executed:', q);
      } catch (e) {
        console.log('Error (might already exist):', e.message);
      }
    }
  } catch (e) {
    console.error('Database Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
