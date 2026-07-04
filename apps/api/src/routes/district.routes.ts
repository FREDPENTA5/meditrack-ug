import { Router } from 'express';
import { districtController } from '../controllers/district.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

export const districtRouter = Router();

districtRouter.use(authenticate);

districtRouter.get(
  '/',
  authorize('DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN', 'FACILITY_WORKER'),
  districtController.list,
);
