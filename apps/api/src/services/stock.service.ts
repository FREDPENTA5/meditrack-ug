import type { BatchStockEntryInput } from '@meditrack/shared';
import type { AccessTokenPayload } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { assertFacilityAccess } from '../utils/scope';
import { calculateStockStatus } from '../utils/stockStatus';
import { facilityRepository } from '../repositories/facility.repository';
import { drugRepository } from '../repositories/drug.repository';
import { stockRepository } from '../repositories/stock.repository';

export const stockService = {
  async getLatestForFacility(facilityId: string) {
    const entries = await stockRepository.getLatestByFacility(facilityId);

    return entries.map((entry) => ({
      id: entry.id,
      facilityId: entry.facilityId,
      drugId: entry.drugId,
      drugName: entry.drug.name,
      category: entry.drug.category,
      quantity: entry.quantity,
      unit: entry.unit,
      status: entry.status,
      daysRemaining: entry.daysRemaining,
      entryDate: entry.entryDate,
      reportedBy: entry.reportedBy.fullName,
    }));
  },

  async getHistory(facilityId: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      stockRepository.getHistory(facilityId, skip, pageSize),
      stockRepository.countHistory(facilityId),
    ]);

    return {
      items: items.map((entry) => ({
        id: entry.id,
        facilityId: entry.facilityId,
        drugId: entry.drugId,
        drugName: entry.drug.name,
        quantity: entry.quantity,
        unit: entry.unit,
        status: entry.status,
        daysRemaining: entry.daysRemaining,
        entryDate: entry.entryDate,
        reportedBy: entry.reportedBy.fullName,
      })),
      meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
    };
  },

  async createBatch(user: AccessTokenPayload, input: BatchStockEntryInput) {
    const facility = await facilityRepository.findById(input.facilityId);

    if (!facility || !facility.isActive) {
      throw new AppError('Facility not found', 404, 'NOT_FOUND');
    }

    assertFacilityAccess(user, facility.id, facility.districtId);

    if (user.role === 'FACILITY_WORKER' && user.facilityId !== input.facilityId) {
      throw new AppError('Can only submit stock for your assigned facility', 403, 'FORBIDDEN');
    }

    const created = [];

    for (const entry of input.entries) {
      const drug = await drugRepository.findById(entry.drugId);

      if (!drug) {
        throw new AppError(`Drug not found: ${entry.drugId}`, 400, 'INVALID_DRUG');
      }

      const threshold = await stockRepository.getThreshold(entry.drugId, input.facilityId);
      const { status, daysRemaining } = calculateStockStatus(entry.quantity, {
        lowDays: threshold?.lowDays ?? 14,
        criticalDays: threshold?.criticalDays ?? 7,
        avgDailyUsage: threshold?.avgDailyUsage ?? 10,
      });

      const record = await stockRepository.createEntry({
        facilityId: input.facilityId,
        drugId: entry.drugId,
        quantity: entry.quantity,
        unit: entry.unit,
        reportedById: user.sub,
        status,
        daysRemaining,
        notes: entry.notes,
      });

      created.push(record);
    }

    return created;
  },
};
