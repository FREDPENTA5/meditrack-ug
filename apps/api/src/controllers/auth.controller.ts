import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse, LoginResponse } from '@meditrack/shared';
import { authService } from '../services/auth.service';
import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  getRefreshTokenFromRequest,
} from '../utils/cookies';

function getRefreshExpiry(rememberMe: boolean): Date {
  const days = rememberMe ? 30 : 7;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);
  return expiresAt;
}

export const authController = {
  async login(req: Request, res: Response<ApiResponse<LoginResponse>>, next: NextFunction) {
    try {
      const { user, accessToken, refreshToken } = await authService.login(req.body);
      const rememberMe = req.body.rememberMe ?? false;

      setRefreshTokenCookie(res, refreshToken, getRefreshExpiry(rememberMe));

      return res.json({
        success: true,
        data: { user, accessToken },
      });
    } catch (error) {
      return next(error);
    }
  },

  async refresh(req: Request, res: Response<ApiResponse<LoginResponse>>, next: NextFunction) {
    try {
      const refreshToken = getRefreshTokenFromRequest(
        req.cookies as Record<string, string | undefined>,
      );

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_REFRESH_TOKEN', message: 'Refresh token not found' },
        });
      }

      const result = await authService.refresh(refreshToken);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      setRefreshTokenCookie(res, result.refreshToken, expiresAt);

      return res.json({
        success: true,
        data: { user: result.user, accessToken: result.accessToken },
      });
    } catch (error) {
      return next(error);
    }
  },

  async logout(req: Request, res: Response<ApiResponse<null>>, next: NextFunction) {
    try {
      const refreshToken = getRefreshTokenFromRequest(
        req.cookies as Record<string, string | undefined>,
      );
      await authService.logout(refreshToken);
      clearRefreshTokenCookie(res);

      return res.json({ success: true, data: null });
    } catch (error) {
      return next(error);
    }
  },

  async me(req: Request, res: Response<ApiResponse<LoginResponse['user']>>, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
        });
      }

      const { sub, email, role, facilityId, districtId } = req.user;
      const user = await authService.getUserById(sub);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'User not found' },
        });
      }

      return res.json({
        success: true,
        data: {
          id: sub,
          email,
          fullName: user.fullName,
          phone: user.phone,
          role,
          facilityId,
          districtId,
        },
      });
    } catch (error) {
      return next(error);
    }
  },

  async updateProfile(
    req: Request,
    res: Response<ApiResponse<LoginResponse['user']>>,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
        });
      }

      const { userService } = await import('../services/user.service');
      const updated = await userService.updateProfile(req.user, req.body);

      return res.json({
        success: true,
        data: {
          id: updated.id,
          email: updated.email,
          fullName: updated.fullName,
          phone: updated.phone,
          role: updated.role as
            | 'FACILITY_WORKER'
            | 'DISTRICT_OFFICER'
            | 'NMS_ADMIN'
            | 'SUPER_ADMIN',
          facilityId: updated.facilityId,
          districtId: updated.districtId,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
};
