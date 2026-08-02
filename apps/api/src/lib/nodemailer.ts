import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';
import { env } from '../config/env';

let transporterInstance: nodemailer.Transporter | null = null;
let testAccountPromise: Promise<nodemailer.Transporter> | null = null;

export async function getTransporter() {
  if (transporterInstance) {
    return transporterInstance;
  }

  if (env.SMTP_USER && env.SMTP_PASS) {
    // Synchronously assign to prevent race conditions during concurrent worker execution
    transporterInstance = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: 465,
      secure: true,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
    return transporterInstance;
  }

  if (!testAccountPromise) {
    testAccountPromise = (async () => {
      logger.info('No SMTP credentials found. Generating Ethereal test account...');
      const testAccount = await nodemailer.createTestAccount();
      const t = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      transporterInstance = t;
      return t;
    })();
  }
  return testAccountPromise;
}

export async function sendEmailAlert(
  to: string,
  subject: string,
  html: string,
): Promise<boolean | string> {
  try {
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: `"MediTrack Alerts" <${env.SMTP_USER || 'alerts@meditrack.ug'}>`,
      to,
      subject,
      html,
    });

    logger.info(`Email sent to ${to}: ${info.messageId}`);

    // Preview only available when sending through an Ethereal account
    const previewUrl = nodemailer.getTestMessageUrl(info as any);
    if (previewUrl) {
      logger.info(`Preview URL: ${previewUrl}`);
    }

    return true;
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error}`);
    return String(error);
  }
}
