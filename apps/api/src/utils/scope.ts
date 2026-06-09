import type { AccessTokenPayload } from './jwt';
import { AppError } from './AppError';

export function getFacilityScope(user: AccessTokenPayload): {
  facilityId?: string;
  districtId?: string;
  national: boolean;
} {
  if (user.role === 'FACILITY_WORKER') {
    if (!user.facilityId) {
      throw new AppError('Facility not assigned to user', 403, 'FORBIDDEN');
    }
    return { facilityId: user.facilityId, national: false };
  }

  if (user.role === 'DISTRICT_OFFICER') {
    if (!user.districtId) {
      throw new AppError('District not assigned to user', 403, 'FORBIDDEN');
    }
    return { districtId: user.districtId, national: false };
  }

  return { national: true };
}

export function assertFacilityAccess(
  user: AccessTokenPayload,
  facilityId: string,
  districtId: string,
) {
  if (user.role === 'FACILITY_WORKER' && user.facilityId !== facilityId) {
    throw new AppError('Access denied to this facility', 403, 'FORBIDDEN');
  }

  if (user.role === 'DISTRICT_OFFICER' && user.districtId !== districtId) {
    throw new AppError('Access denied to this facility', 403, 'FORBIDDEN');
  }
}
