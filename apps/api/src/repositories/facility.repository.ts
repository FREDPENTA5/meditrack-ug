import { prisma } from '../lib/prisma';

export const facilityRepository = {
  findMany(scope: { facilityId?: string; districtId?: string; national?: boolean }) {
    return prisma.facility.findMany({
      where: {
        isActive: true,
        ...(scope.facilityId ? { id: scope.facilityId } : {}),
        ...(scope.districtId ? { districtId: scope.districtId } : {}),
      },
      include: { district: true },
      orderBy: { name: 'asc' },
    });
  },

  findById(id: string) {
    return prisma.facility.findUnique({
      where: { id },
      include: { district: true, workers: { where: { isActive: true } } },
    });
  },
};
