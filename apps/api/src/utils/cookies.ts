import type { Response } from 'express';
import { env } from '../config/env';

const REFRESH_COOKIE = 'meditrack_refresh_token';

export function setRefreshTokenCookie(res: Response, token: string, expiresAt: Date) {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/api/v1/auth',
  });
}

export function clearRefreshTokenCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/api/v1/auth',
  });
}

export function getRefreshTokenFromRequest(
  cookies: Record<string, string | undefined>,
): string | undefined {
  return cookies[REFRESH_COOKIE];
}
