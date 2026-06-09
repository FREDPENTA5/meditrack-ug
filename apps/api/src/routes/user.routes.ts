import { Router } from 'express';
import { UpdateUserStatusSchema } from '@meditrack/shared';
import { userController } from '../controllers/user.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { validateBody } from '../middleware/validate';

export const userRouter = Router();

userRouter.use(authenticate);
userRouter.get('/', authorize('NMS_ADMIN', 'SUPER_ADMIN'), userController.list);
userRouter.patch(
  '/:id/status',
  authorize('NMS_ADMIN', 'SUPER_ADMIN'),
  validateBody(UpdateUserStatusSchema),
  userController.setActive,
);
