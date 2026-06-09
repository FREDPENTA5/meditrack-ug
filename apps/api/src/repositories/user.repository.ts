import type { User } from '@prisma/client';
import { prisma } from '../lib/prisma';

export const userRepository = {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  updateLastLogin(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  },

  findMany(scope: { districtId?: string }) {
    return prisma.user.findMany({
      where: {
        ...(scope.districtId ? { districtId: scope.districtId } : {}),
      },
      include: {
        facility: { select: { name: true } },
        district: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  updateProfile(id: string, data: { fullName: string; phone?: string | null }) {
    return prisma.user.update({
      where: { id },
      data: {
        fullName: data.fullName,
        phone: data.phone ?? null,
      },
    });
  },

  setActive(id: string, isActive: boolean) {
    return prisma.user.update({
      where: { id },
      data: { isActive },
    });
  },
};
