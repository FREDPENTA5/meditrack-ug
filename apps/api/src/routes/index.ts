import { Router } from 'express';
import { authRouter } from './auth.routes';
import { facilityRouter } from './facility.routes';
import { drugRouter } from './drug.routes';
import { stockRouter } from './stock.routes';
import { dashboardRouter } from './dashboard.routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/facilities', facilityRouter);
apiRouter.use('/drugs', drugRouter);
apiRouter.use('/stock', stockRouter);
apiRouter.use('/dashboard', dashboardRouter);

apiRouter.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});
