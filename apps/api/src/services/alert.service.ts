import type { AlertListQuery, UpdateAlertStatusInput } from '@meditrack/shared';
import type { AccessTokenPayload } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { getFacilityScope, assertFacilityAccess } from '../utils/scope';
import { alertRepository } from '../repositories/alert.repository';

function mapAlert(alert: {
  id: string;
  facilityId: string;
  drugId: string | null;
  drugName: string;
  severity: string;
  type: string;
  message: string;
  status: string;
  smsDelivered: boolean;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date | null;
  facility: { name: string; code?: string };
}) {
  return {
    id: alert.id,
    facilityId: alert.facilityId,
    facilityName: alert.facility.name,
    facilityCode: alert.facility.code,
    drugId: alert.drugId,
    drugName: alert.drugName,
    severity: alert.severity,
    type: alert.type,
    message: alert.message,
    status: alert.status,
    smsDelivered: alert.smsDelivered,
    createdAt: alert.createdAt,
    updatedAt: alert.updatedAt,
    resolvedAt: alert.resolvedAt,
  };
}

export const alertService = {
  async list(user: AccessTokenPayload, query: AlertListQuery) {
    const scope = getFacilityScope(user);
    const skip = (query.page - 1) * query.pageSize;
    const [items, total] = await Promise.all([
      alertRepository.findMany(scope, {
        status: query.status,
        severity: query.severity,
        skip,
        take: query.pageSize,
      }),
      alertRepository.count(scope, { status: query.status, severity: query.severity }),
    ]);

    return {
      items: items.map(mapAlert),
      meta: {
        page: query.page,
        pageSize: query.pageSize,
        total,
        totalPages: Math.ceil(total / query.pageSize),
      },
    };
  },

  async getById(user: AccessTokenPayload, id: string) {
    const alert = await alertRepository.findById(id);
    if (!alert) throw new AppError('Alert not found', 404, 'NOT_FOUND');
    assertFacilityAccess(user, alert.facilityId, alert.facility.districtId);
    return mapAlert(alert);
  },

  async updateStatus(user: AccessTokenPayload, id: string, input: UpdateAlertStatusInput) {
    const alert = await alertRepository.findById(id);
    if (!alert) throw new AppError('Alert not found', 404, 'NOT_FOUND');
    assertFacilityAccess(user, alert.facilityId, alert.facility.districtId);

    const updated = await alertRepository.updateStatus(id, input.status, user.sub);
    return mapAlert(updated);
  },
};
