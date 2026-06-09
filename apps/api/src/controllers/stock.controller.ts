import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@meditrack/shared';
import { stockService } from '../services/stock.service';
import { AppError } from '../utils/AppError';
import { assertFacilityAccess } from '../utils/scope';
import { facilityRepository } from '../repositories/facility.repository';

export const stockController = {
  async createBatch(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await stockService.createBatch(req.user, req.body);
      return res.status(201).json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },

  async getLatest(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const facilityId = String(req.params.facilityId);
      const facility = await facilityRepository.findById(facilityId);
      if (!facility) throw new AppError('Facility not found', 404, 'NOT_FOUND');
      assertFacilityAccess(req.user, facility.id, facility.districtId);
      const data = await stockService.getLatestForFacility(facilityId);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },

  async getHistory(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const facilityId = String(req.params.facilityId);
      const facility = await facilityRepository.findById(facilityId);
      if (!facility) throw new AppError('Facility not found', 404, 'NOT_FOUND');
      assertFacilityAccess(req.user, facility.id, facility.districtId);
      const query = req.query as { page?: number; pageSize?: number };
      const data = await stockService.getHistory(facilityId, query.page ?? 1, query.pageSize ?? 20);
      return res.json({ success: true, data: data.items, meta: data.meta });
    } catch (error) {
      return next(error);
    }
  },
};
