import { prisma } from '../lib/prisma';

export const refreshTokenRepository = {
  create(userId: string, tokenHash: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: { userId, tokenHash, expiresAt },
    });
  },

  findByHash(tokenHash: string) {
    return prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });
  },

  deleteByHash(tokenHash: string) {
    return prisma.refreshToken.delete({ where: { tokenHash } });
  },

  deleteAllForUser(userId: string) {
    return prisma.refreshToken.deleteMany({ where: { userId } });
  },
};
