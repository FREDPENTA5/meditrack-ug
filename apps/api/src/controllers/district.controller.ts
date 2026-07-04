import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@meditrack/shared';
import { districtService } from '../services/district.service';
import { AppError } from '../utils/AppError';

export const districtController = {
  async list(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await districtService.list(req.user);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },
};
