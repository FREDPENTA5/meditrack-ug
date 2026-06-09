import { Router } from 'express';
import { dashboardController } from '../controllers/dashboard.controller';
import { authenticate } from '../middleware/authenticate';

export const dashboardRouter = Router();

dashboardRouter.use(authenticate);
dashboardRouter.get('/summary', dashboardController.summary);
dashboardRouter.get('/map', dashboardController.map);
dashboardRouter.get('/alerts', dashboardController.recentAlerts);
