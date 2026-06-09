import type { NextFunction, Request, Response } from 'express';
import type { Role } from '@meditrack/shared';
import { AppError } from '../utils/AppError';

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403, 'FORBIDDEN'));
    }

    return next();
  };
}
