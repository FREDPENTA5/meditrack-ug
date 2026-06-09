import jwt from 'jsonwebtoken';
import type { Role } from '@meditrack/shared';
import { env } from '../config/env';

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: Role;
  facilityId: string | null;
  districtId: string | null;
}

const ACCESS_TOKEN_EXPIRY = '15m';

export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}
