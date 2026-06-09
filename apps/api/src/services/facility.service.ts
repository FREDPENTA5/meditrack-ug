import type { AccessTokenPayload } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { getFacilityScope, assertFacilityAccess } from '../utils/scope';
import { facilityRepository } from '../repositories/facility.repository';
import { stockService } from './stock.service';

export const facilityService = {
  async list(user: AccessTokenPayload) {
    const scope = getFacilityScope(user);
    const facilities = await facilityRepository.findMany(scope);

    return facilities.map((f) => ({
      id: f.id,
      name: f.name,
      code: f.code,
      level: f.level,
      districtId: f.districtId,
      districtName: f.district.name,
      latitude: f.latitude,
      longitude: f.longitude,
      address: f.address,
      contactPhone: f.contactPhone,
      isActive: f.isActive,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt,
    }));
  },

  async getById(user: AccessTokenPayload, id: string) {
    const facility = await facilityRepository.findById(id);

    if (!facility || !facility.isActive) {
      throw new AppError('Facility not found', 404, 'NOT_FOUND');
    }

    assertFacilityAccess(user, facility.id, facility.districtId);

    return {
      id: facility.id,
      name: facility.name,
      code: facility.code,
      level: facility.level,
      districtId: facility.districtId,
      districtName: facility.district.name,
      latitude: facility.latitude,
      longitude: facility.longitude,
      address: facility.address,
      contactPhone: facility.contactPhone,
      isActive: facility.isActive,
      workers: facility.workers.map((w) => ({
        id: w.id,
        fullName: w.fullName,
        email: w.email,
        role: w.role,
      })),
      createdAt: facility.createdAt,
      updatedAt: facility.updatedAt,
    };
  },

  async getStock(user: AccessTokenPayload, facilityId: string) {
    const facility = await facilityRepository.findById(facilityId);

    if (!facility || !facility.isActive) {
      throw new AppError('Facility not found', 404, 'NOT_FOUND');
    }

    assertFacilityAccess(user, facility.id, facility.districtId);

    return stockService.getLatestForFacility(facilityId);
  },
};
