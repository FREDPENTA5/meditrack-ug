import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@meditrack/shared';
import { facilityService } from '../services/facility.service';
import { AppError } from '../utils/AppError';

export const facilityController = {
  async list(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await facilityService.list(req.user);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },

  async getById(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await facilityService.getById(req.user, String(req.params.id));
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },

  async getStock(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await facilityService.getStock(req.user, String(req.params.id));
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },
};
