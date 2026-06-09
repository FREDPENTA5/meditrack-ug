import { Router } from 'express';
import { LoginSchema, UpdateProfileSchema } from '@meditrack/shared';
import { validateBody } from '../middleware/validate';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/authenticate';

export const authRouter = Router();

authRouter.post('/login', validateBody(LoginSchema), authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', authenticate, authController.me);
authRouter.patch(
  '/me',
  authenticate,
  validateBody(UpdateProfileSchema),
  authController.updateProfile,
);
