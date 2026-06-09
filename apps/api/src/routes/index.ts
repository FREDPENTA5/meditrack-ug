import { Router } from 'express';
import { authRouter } from './auth.routes';
import { facilityRouter } from './facility.routes';
import { drugRouter } from './drug.routes';
import { stockRouter } from './stock.routes';
import { dashboardRouter } from './dashboard.routes';
import { alertRouter } from './alert.routes';
import { userRouter } from './user.routes';
import { reportRouter } from './report.routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/facilities', facilityRouter);
apiRouter.use('/drugs', drugRouter);
apiRouter.use('/stock', stockRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/alerts', alertRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/reports', reportRouter);

apiRouter.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});
