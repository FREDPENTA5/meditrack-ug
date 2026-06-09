import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@meditrack/shared';
import { dashboardService } from '../services/dashboard.service';
import { AppError } from '../utils/AppError';

export const dashboardController = {
  async summary(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await dashboardService.getSummary(req.user);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },

  async map(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await dashboardService.getMap(req.user);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },

  async recentAlerts(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const limit = Number(req.query.limit ?? 10);
      const data = await dashboardService.getRecentAlerts(req.user, limit);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },
};
