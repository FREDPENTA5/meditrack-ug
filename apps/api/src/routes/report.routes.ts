import { Router } from 'express';
import { reportController } from '../controllers/report.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

export const reportRouter = Router();

reportRouter.use(authenticate);
reportRouter.get(
  '/summary',
  authorize('DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN'),
  reportController.summary,
);
