import { Router } from 'express';
import { AlertListQuerySchema, UpdateAlertStatusSchema } from '@meditrack/shared';
import { alertController } from '../controllers/alert.controller';
import { authenticate } from '../middleware/authenticate';
import { validateBody } from '../middleware/validate';
import { validateQuery } from '../middleware/validateQuery';

export const alertRouter = Router();

alertRouter.use(authenticate);
alertRouter.get('/', validateQuery(AlertListQuerySchema), alertController.list);
alertRouter.get('/:id', alertController.getById);
alertRouter.patch(
  '/:id/status',
  validateBody(UpdateAlertStatusSchema),
  alertController.updateStatus,
);
