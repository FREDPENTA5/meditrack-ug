import { prisma } from '../lib/prisma';
import type { AccessTokenPayload } from '../utils/jwt';

export const districtService = {
  async list(user: AccessTokenPayload) {
    const districts = await prisma.district.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    });
    return districts;
  },
};
