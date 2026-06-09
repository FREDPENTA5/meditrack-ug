import { prisma } from '../lib/prisma';

export const dashboardRepository = {
  countFacilities(scope: { facilityId?: string; districtId?: string }) {
    return prisma.facility.count({
      where: {
        isActive: true,
        ...(scope.facilityId ? { id: scope.facilityId } : {}),
        ...(scope.districtId ? { districtId: scope.districtId } : {}),
      },
    });
  },

  countActiveAlerts(scope: { facilityId?: string; districtId?: string }) {
    return prisma.alert.count({
      where: {
        status: { in: ['ACTIVE', 'ACKNOWLEDGED'] },
        facility: {
          isActive: true,
          ...(scope.facilityId ? { id: scope.facilityId } : {}),
          ...(scope.districtId ? { districtId: scope.districtId } : {}),
        },
      },
    });
  },

  countStockoutsToday(scope: { facilityId?: string; districtId?: string }) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return prisma.stockEntry.count({
      where: {
        status: 'STOCKOUT',
        entryDate: { gte: startOfDay },
        facility: {
          isActive: true,
          ...(scope.facilityId ? { id: scope.facilityId } : {}),
          ...(scope.districtId ? { districtId: scope.districtId } : {}),
        },
      },
    });
  },

  getFacilitiesWithLatestStock(scope: { facilityId?: string; districtId?: string }) {
    return prisma.facility.findMany({
      where: {
        isActive: true,
        ...(scope.facilityId ? { id: scope.facilityId } : {}),
        ...(scope.districtId ? { districtId: scope.districtId } : {}),
      },
      include: {
        stockEntries: {
          orderBy: { entryDate: 'desc' },
          take: 200,
        },
      },
    });
  },

  getRecentAlerts(scope: { facilityId?: string; districtId?: string }, limit = 10) {
    return prisma.alert.findMany({
      where: {
        facility: {
          isActive: true,
          ...(scope.facilityId ? { id: scope.facilityId } : {}),
          ...(scope.districtId ? { districtId: scope.districtId } : {}),
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: { facility: { select: { name: true } } },
    });
  },
};
