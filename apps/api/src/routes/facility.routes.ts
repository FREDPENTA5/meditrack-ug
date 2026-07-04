import { Router } from 'express';
import { facilityController } from '../controllers/facility.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

export const facilityRouter = Router();

facilityRouter.use(authenticate);

facilityRouter.get(
  '/',
  authorize('DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN'),
  facilityController.list,
);
facilityRouter.post('/', authorize('NMS_ADMIN', 'SUPER_ADMIN'), facilityController.create);
facilityRouter.get('/:id', facilityController.getById);
facilityRouter.patch(
  '/:id/status',
  authorize('NMS_ADMIN', 'SUPER_ADMIN'),
  facilityController.setActive,
);
facilityRouter.get('/:id/stock', facilityController.getStock);
