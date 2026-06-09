import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@meditrack/shared';
import { alertService } from '../services/alert.service';
import { AppError } from '../utils/AppError';

export const alertController = {
  async list(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const result = await alertService.list(req.user, req.query as never);
      return res.json({ success: true, data: result.items, meta: result.meta });
    } catch (error) {
      return next(error);
    }
  },

  async getById(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await alertService.getById(req.user, String(req.params.id));
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },

  async updateStatus(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await alertService.updateStatus(req.user, String(req.params.id), req.body);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },
};
