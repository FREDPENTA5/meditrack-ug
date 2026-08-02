const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  const hash = await bcrypt.hash('Password123!', 12);
  await prisma.user.updateMany({
    data: { passwordHash: hash },
  });
  console.log('Password fixed for ALL users to Password123!');
}

fix()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
