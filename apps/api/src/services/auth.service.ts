import type { AuthUser, LoginInput } from '@meditrack/shared';
import { AppError } from '../utils/AppError';
import { userRepository } from '../repositories/user.repository';
import { refreshTokenRepository } from '../repositories/refreshToken.repository';
import { hashPassword, verifyPassword } from '../utils/password';
import { signAccessToken } from '../utils/jwt';
import { generateRefreshToken, hashToken } from '../utils/tokens';

const REFRESH_TOKEN_DAYS = 7;
const REMEMBER_ME_DAYS = 30;

function toAuthUser(user: {
  id: string;
  email: string;
  fullName: string;
  role: AuthUser['role'];
  facilityId: string | null;
  districtId: string | null;
}): AuthUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    facilityId: user.facilityId,
    districtId: user.districtId,
  };
}

function getRefreshExpiry(rememberMe: boolean): Date {
  const days = rememberMe ? REMEMBER_ME_DAYS : REFRESH_TOKEN_DAYS;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);
  return expiresAt;
}

export const authService = {
  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email.toLowerCase());

    if (!user || !user.isActive) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    const passwordValid = await verifyPassword(input.password, user.passwordHash);

    if (!passwordValid) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    await userRepository.updateLastLogin(user.id);

    const authUser = toAuthUser(user);
    const accessToken = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
      facilityId: user.facilityId,
      districtId: user.districtId,
    });

    const refreshToken = generateRefreshToken();
    const tokenHash = hashToken(refreshToken);

    await refreshTokenRepository.create(
      user.id,
      tokenHash,
      getRefreshExpiry(input.rememberMe ?? false),
    );

    return { user: authUser, accessToken, refreshToken };
  },

  async refresh(refreshToken: string) {
    const tokenHash = hashToken(refreshToken);
    const stored = await refreshTokenRepository.findByHash(tokenHash);

    if (!stored || stored.expiresAt < new Date() || !stored.user.isActive) {
      throw new AppError('Invalid or expired refresh token', 401, 'INVALID_REFRESH_TOKEN');
    }

    await refreshTokenRepository.deleteByHash(tokenHash);

    const authUser = toAuthUser(stored.user);
    const accessToken = signAccessToken({
      sub: stored.user.id,
      email: stored.user.email,
      role: stored.user.role,
      facilityId: stored.user.facilityId,
      districtId: stored.user.districtId,
    });

    const newRefreshToken = generateRefreshToken();
    const newTokenHash = hashToken(newRefreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_DAYS);

    await refreshTokenRepository.create(stored.user.id, newTokenHash, expiresAt);

    return { user: authUser, accessToken, refreshToken: newRefreshToken };
  },

  async logout(refreshToken: string | undefined) {
    if (!refreshToken) {
      return;
    }

    const tokenHash = hashToken(refreshToken);

    try {
      await refreshTokenRepository.deleteByHash(tokenHash);
    } catch {
      // Token may already be invalid or removed
    }
  },

  async getUserById(id: string) {
    return userRepository.findById(id);
  },

  hashPassword,
};
