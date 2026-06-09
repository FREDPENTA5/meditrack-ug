import { Router } from 'express';
import { BatchStockEntrySchema, PaginationQuerySchema } from '@meditrack/shared';
import { stockController } from '../controllers/stock.controller';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';
import { validateBody } from '../middleware/validate';
import { validateQuery } from '../middleware/validateQuery';

export const stockRouter = Router();

stockRouter.use(authenticate);

stockRouter.post(
  '/entry',
  authorize('FACILITY_WORKER', 'DISTRICT_OFFICER', 'NMS_ADMIN', 'SUPER_ADMIN'),
  validateBody(BatchStockEntrySchema),
  stockController.createBatch,
);

stockRouter.get('/:facilityId/latest', stockController.getLatest);

stockRouter.get('/:facilityId', validateQuery(PaginationQuerySchema), stockController.getHistory);
