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
    const rawPayload = verifyAccessToken(token) as any;

    // Support Supabase JWT format
    if (rawPayload.user_metadata) {
      req.user = {
        sub: rawPayload.sub,
        email: rawPayload.email,
        role: rawPayload.user_metadata.role,
        facilityId: rawPayload.user_metadata.facilityId || null,
        districtId: rawPayload.user_metadata.districtId || null,
      } as AccessTokenPayload;
    } else {
      req.user = rawPayload as AccessTokenPayload;
    }

    return next();
  } catch (err: any) {
    return next(
      new AppError('Invalid or expired access token: ' + err.message, 401, 'INVALID_TOKEN'),
    );
  }
}
