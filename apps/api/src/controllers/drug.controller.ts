import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@meditrack/shared';
import { drugService } from '../services/drug.service';
import { AppError } from '../utils/AppError';

export const drugController = {
  async list(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      const result = await drugService.list(req.query as never);
      return res.json({ success: true, data: result.items, meta: result.meta });
    } catch (error) {
      return next(error);
    }
  },

  async getById(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      const data = await drugService.getById(String(req.params.id));
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },
};
