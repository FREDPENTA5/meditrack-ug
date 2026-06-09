import type { NextFunction, Request, Response } from 'express';
import type { AccessTokenPayload } from '../utils/jwt';
import { verifyAccessToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
  }

  const token = authHeader.slice(7);

  try {
    req.user = verifyAccessToken(token);
    return next();
  } catch {
    return next(new AppError('Invalid or expired access token', 401, 'INVALID_TOKEN'));
  }
}
