import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppError } from '../utils/AppError';

vi.mock('../config/env', () => ({
  env: {
    JWT_ACCESS_SECRET: 'test-access-secret-minimum-32-characters-long',
    JWT_REFRESH_SECRET: 'test-refresh-secret-minimum-32-characters-long',
    NODE_ENV: 'test',
  },
}));

import { authService } from './auth.service';

vi.mock('../repositories/user.repository', () => ({
  userRepository: {
    findByEmail: vi.fn(),
    findById: vi.fn(),
    updateLastLogin: vi.fn(),
  },
}));

vi.mock('../repositories/refreshToken.repository', () => ({
  refreshTokenRepository: {
    create: vi.fn(),
    findByHash: vi.fn(),
    deleteByHash: vi.fn(),
    deleteAllForUser: vi.fn(),
  },
}));

vi.mock('../utils/password', () => ({
  verifyPassword: vi.fn(),
  hashPassword: vi.fn(),
}));

import { userRepository } from '../repositories/user.repository';
import { refreshTokenRepository } from '../repositories/refreshToken.repository';
import { verifyPassword } from '../utils/password';

const mockUser = {
  id: 'user-1',
  email: 'pharmacist@gayaza.ug',
  passwordHash: 'hashed',
  fullName: 'Sarah Nakato',
  phone: null,
  role: 'FACILITY_WORKER' as const,
  facilityId: 'facility-1',
  districtId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  isActive: true,
  lastLoginAt: null,
};

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser);
      vi.mocked(verifyPassword).mockResolvedValue(true);
      vi.mocked(userRepository.updateLastLogin).mockResolvedValue(mockUser);
      vi.mocked(refreshTokenRepository.create).mockResolvedValue({
        id: 'rt-1',
        userId: mockUser.id,
        tokenHash: 'hash',
        expiresAt: new Date(),
        createdAt: new Date(),
      });

      const result = await authService.login({
        email: 'pharmacist@gayaza.ug',
        password: 'Password123!',
        rememberMe: false,
      });

      expect(result.user.email).toBe('pharmacist@gayaza.ug');
      expect(result.accessToken).toBeTruthy();
      expect(result.refreshToken).toBeTruthy();
      expect(refreshTokenRepository.create).toHaveBeenCalledOnce();
    });

    it('should reject invalid credentials', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'wrong@example.com',
          password: 'Password123!',
        }),
      ).rejects.toThrow(AppError);
    });

    it('should reject wrong password', async () => {
      vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser);
      vi.mocked(verifyPassword).mockResolvedValue(false);

      await expect(
        authService.login({
          email: 'pharmacist@gayaza.ug',
          password: 'wrong-password',
        }),
      ).rejects.toMatchObject({ code: 'INVALID_CREDENTIALS' });
    });
  });
});
