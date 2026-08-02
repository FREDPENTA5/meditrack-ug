import { Router } from 'express';
import { authRouter } from './auth.routes';
import { facilityRouter } from './facility.routes';
import { drugRouter } from './drug.routes';
import { stockRouter } from './stock.routes';
import { dashboardRouter } from './dashboard.routes';
import { alertRouter } from './alert.routes';
import { userRouter } from './user.routes';
import { reportRouter } from './report.routes';
import { districtRouter } from './district.routes';
import { sendEmailAlert } from '../lib/nodemailer';

export const apiRouter = Router();

apiRouter.get('/debug/email', async (req, res) => {
  try {
    const success = await sendEmailAlert('lnakiregga@gmail.com', 'Debug Test', 'Testing from API');
    res.json({ success, message: 'Test completed' });
  } catch (error) {
    res.json({ success: false, error: String(error) });
  }
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/facilities', facilityRouter);
apiRouter.use('/districts', districtRouter);
apiRouter.use('/drugs', drugRouter);
apiRouter.use('/stock', stockRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/alerts', alertRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/reports', reportRouter);

apiRouter.get('/health', (_req, res) => {
  res.json({ success: true, data: { status: 'ok' } });
});
