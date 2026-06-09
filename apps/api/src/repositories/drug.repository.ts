import type { DrugCategory } from '@meditrack/shared';
import { prisma } from '../lib/prisma';

export const drugRepository = {
  findMany(params: { category?: DrugCategory; search?: string; skip: number; take: number }) {
    return prisma.drug.findMany({
      where: {
        ...(params.category ? { category: params.category } : {}),
        ...(params.search
          ? {
              OR: [
                { name: { contains: params.search, mode: 'insensitive' } },
                { genericName: { contains: params.search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: { name: 'asc' },
      skip: params.skip,
      take: params.take,
    });
  },

  count(params: { category?: DrugCategory; search?: string }) {
    return prisma.drug.count({
      where: {
        ...(params.category ? { category: params.category } : {}),
        ...(params.search
          ? {
              OR: [
                { name: { contains: params.search, mode: 'insensitive' } },
                { genericName: { contains: params.search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
    });
  },

  findById(id: string) {
    return prisma.drug.findUnique({ where: { id } });
  },
};
