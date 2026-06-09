import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '@meditrack/shared';
import { userService } from '../services/user.service';
import { AppError } from '../utils/AppError';

export const userController = {
  async list(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await userService.list(req.user);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },

  async setActive(req: Request, res: Response<ApiResponse<unknown>>, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
      const data = await userService.setActive(req.user, String(req.params.id), req.body);
      return res.json({ success: true, data });
    } catch (error) {
      return next(error);
    }
  },
};
