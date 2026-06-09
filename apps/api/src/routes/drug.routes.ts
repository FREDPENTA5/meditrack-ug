import { Router } from 'express';
import { DrugListQuerySchema } from '@meditrack/shared';
import { drugController } from '../controllers/drug.controller';
import { authenticate } from '../middleware/authenticate';
import { validateQuery } from '../middleware/validateQuery';

export const drugRouter = Router();

drugRouter.use(authenticate);
drugRouter.get('/', validateQuery(DrugListQuerySchema), drugController.list);
drugRouter.get('/:id', drugController.getById);
