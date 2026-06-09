import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { AppError } from '../utils/AppError';

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      return next(new AppError('Invalid query parameters', 400, 'VALIDATION_ERROR'));
    }

    req.query = result.data as unknown as Request['query'];
    return next();
  };
}
