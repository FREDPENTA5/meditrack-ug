import type { StockStatus } from '@prisma/client';
import { prisma } from '../lib/prisma';

export const stockRepository = {
  async getLatestByFacility(facilityId: string) {
    const entries = await prisma.stockEntry.findMany({
      where: { facilityId },
      orderBy: { entryDate: 'desc' },
      include: { drug: true, reportedBy: { select: { id: true, fullName: true } } },
    });

    const latestByDrug = new Map<string, (typeof entries)[number]>();
    for (const entry of entries) {
      if (!latestByDrug.has(entry.drugId)) {
        latestByDrug.set(entry.drugId, entry);
      }
    }

    return Array.from(latestByDrug.values());
  },

  async getHistory(facilityId: string, skip: number, take: number) {
    return prisma.stockEntry.findMany({
      where: { facilityId },
      include: { drug: true, reportedBy: { select: { id: true, fullName: true } } },
      orderBy: { entryDate: 'desc' },
      skip,
      take,
    });
  },

  countHistory(facilityId: string) {
    return prisma.stockEntry.count({ where: { facilityId } });
  },

  createEntry(data: {
    facilityId: string;
    drugId: string;
    quantity: number;
    unit: string;
    reportedById: string;
    status: StockStatus;
    daysRemaining: number | null;
    notes?: string;
  }) {
    return prisma.stockEntry.create({ data });
  },

  getThreshold(drugId: string, facilityId?: string) {
    return prisma.threshold.findFirst({
      where: {
        drugId,
        OR: [{ facilityId }, { facilityId: null }],
      },
      orderBy: { facilityId: 'desc' },
    });
  },
};
