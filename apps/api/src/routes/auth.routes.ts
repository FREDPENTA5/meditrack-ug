import { Router } from 'express';
import { LoginSchema } from '@meditrack/shared';
import { authController } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validate';
import { authenticate } from '../middleware/authenticate';

export const authRouter = Router();

authRouter.post('/login', validateBody(LoginSchema), authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/logout', authController.logout);
authRouter.get('/me', authenticate, authController.me);
