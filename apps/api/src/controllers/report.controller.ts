import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@meditrack/shared';
import { reportService } from '../services/report.service';
import { AppError } from '../utils/AppError';

export const reportController = {
  async summary(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await reportService.getSummary(req.user);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },
};
