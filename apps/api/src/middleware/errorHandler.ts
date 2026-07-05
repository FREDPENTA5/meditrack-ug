import type { NextFunction, Request, Response } from 'express';
import type { ApiResponse } from '@meditrack/shared';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiResponse<null>>,
  _next: NextFunction,
) {
  if (err instanceof AppError || err.name === 'AppError') {
    const appErr = err as AppError;
    return res.status(appErr.statusCode).json({
      success: false,
      error: {
        code: appErr.code,
        message: appErr.message,
      },
    });
  }

  logger.error('Unexpected error', { error: err.message, stack: err.stack });

  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred',
    },
  });
}
