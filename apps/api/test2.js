const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const district = await prisma.district.findFirst();
    const user = await prisma.user.create({
      data: {
        email: 'royal3@gmail.com',
        passwordHash: 'hash',
        fullName: 'royal',
        role: 'DISTRICT_OFFICER',
        districtId: district?.id,
        facilityId: '', // EMPTY STRING
        isActive: true,
      },
    });
    console.log('SUCCESS:', user);
  } catch (error) {
    console.error('ERROR OCCURRED:');
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
