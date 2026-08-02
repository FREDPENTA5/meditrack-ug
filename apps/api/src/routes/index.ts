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
import { sendEmailAlert, getTransporter, getEmailProvider } from '../lib/nodemailer';
import { env } from '../config/env';

export const apiRouter = Router();

apiRouter.get('/debug/email', async (req, res) => {
  const provider = getEmailProvider();
  let to: string;
  if (provider === 'resend') {
    to = env.RESEND_TEST_TO;
  } else {
    const fallbackTo = env.RESEND_TEST_TO;
    const rawTo = typeof req.query.to === 'string' ? req.query.to.trim() : '';
    to = rawTo || fallbackTo;
  }

  try {
    if (provider === 'smtp') {
      const transporter = await getTransporter();
      await transporter.verify();
    }

    const success = await sendEmailAlert(to, 'Debug Test', 'Testing from API');
    res.json({
      success: success === true,
      message: success === true ? 'Test email sent' : 'Send failed',
      to,
      provider,
      config:
        provider === 'resend'
          ? { from: env.RESEND_FROM }
          : { host: env.SMTP_HOST, port: env.SMTP_PORT, user: env.SMTP_USER },
      error: success !== true ? success : undefined,
    });
  } catch (error) {
    res.json({
      success: false,
      provider,
      error: String(error),
    });
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
