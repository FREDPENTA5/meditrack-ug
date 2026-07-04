import type { UpdateProfileInput, UpdateUserStatusInput } from '@meditrack/shared';
import type { AccessTokenPayload } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { userRepository } from '../repositories/user.repository';

function mapUser(user: {
  id: string;
  email: string;
  fullName: string;
  phone: string | null;
  role: string;
  facilityId: string | null;
  districtId: string | null;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  facility?: { name: string } | null;
  district?: { name: string } | null;
}) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    phone: user.phone,
    role: user.role,
    facilityId: user.facilityId,
    districtId: user.districtId,
    facilityName: user.facility?.name ?? null,
    districtName: user.district?.name ?? null,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
  };
}

export const userService = {
  async list(user: AccessTokenPayload) {
    if (user.role !== 'NMS_ADMIN' && user.role !== 'SUPER_ADMIN') {
      throw new AppError('Access denied', 403, 'FORBIDDEN');
    }

    const users = await userRepository.findMany({});
    return users.map(mapUser);
  },

  async create(actor: AccessTokenPayload, input: import('@meditrack/shared').RegisterInput) {
    if (actor.role !== 'NMS_ADMIN' && actor.role !== 'SUPER_ADMIN') {
      throw new AppError('Access denied', 403, 'FORBIDDEN');
    }

    const existing = await userRepository.findByEmail(input.email.toLowerCase());
    if (existing) {
      throw new AppError('Email already in use', 400, 'BAD_REQUEST');
    }

    const { hashPassword } = await import('../utils/password');
    const passwordHash = await hashPassword(input.password);

    const user = await userRepository.create({
      email: input.email.toLowerCase(),
      passwordHash,
      fullName: input.fullName,
      role: input.role,
      facilityId: input.facilityId,
      districtId: input.districtId,
    });

    return mapUser({
      ...user,
      facility: null,
      district: null,
    });
  },

  async updateProfile(userToken: AccessTokenPayload, input: UpdateProfileInput) {
    const updated = await userRepository.updateProfile(userToken.sub, input);
    return mapUser(updated as any);
  },

  async setActive(actor: AccessTokenPayload, targetUserId: string, input: UpdateUserStatusInput) {
    if (actor.role !== 'NMS_ADMIN' && actor.role !== 'SUPER_ADMIN') {
      throw new AppError('Access denied', 403, 'FORBIDDEN');
    }

    const target = await userRepository.findById(targetUserId);
    if (!target) throw new AppError('User not found', 404, 'NOT_FOUND');

    const updated = await userRepository.setActive(targetUserId, input.isActive);
    return mapUser(updated);
  },
};
