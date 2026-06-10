import type { AuthUser } from '@meditrack/shared';

export interface FacilityScope {
  facilityId?: string;
  districtId?: string;
}

export function getFacilityScope(user: AuthUser): FacilityScope {
  if (user.role === 'FACILITY_WORKER' && user.facilityId) {
    return { facilityId: user.facilityId };
  }

  if (user.role === 'DISTRICT_OFFICER' && user.districtId) {
    return { districtId: user.districtId };
  }

  return {};
}
