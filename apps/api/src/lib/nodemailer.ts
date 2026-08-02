import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { logger } from '../utils/logger';
import { env } from '../config/env';

let transporterInstance: nodemailer.Transporter | null = null;
let testAccountPromise: Promise<nodemailer.Transporter> | null = null;
let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient && env.RESEND_API_KEY) {
    resendClient = new Resend(env.RESEND_API_KEY);
  }
  return resendClient;
}

export async function getTransporter() {
  if (transporterInstance) {
    return transporterInstance;
  }

  if (env.SMTP_USER && env.SMTP_PASS) {
    transporterInstance = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT),
      secure: Number(env.SMTP_PORT) === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
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

export function getEmailProvider(): 'resend' | 'smtp' {
  return env.RESEND_API_KEY ? 'resend' : 'smtp';
}

async function sendViaResend(to: string, subject: string, html: string): Promise<boolean | string> {
  const resend = getResendClient();
  if (!resend) {
    return 'Resend API key is not configured';
  }

  const { data, error } = await resend.emails.send({
    from: env.RESEND_FROM,
    to,
    subject,
    html,
  });

  if (error) {
    return error.message;
  }

  logger.info(`Email sent via Resend to ${to}: ${data?.id}`);
  return true;
}

export async function sendEmailAlert(
  to: string,
  subject: string,
  html: string,
): Promise<boolean | string> {
  try {
    if (env.RESEND_API_KEY) {
      return sendViaResend(to, subject, html);
    }

    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: `"MediTrack Alerts" <${env.SMTP_USER || 'alerts@meditrack.ug'}>`,
      to,
      subject,
      html,
    });

    logger.info(`Email sent to ${to}: ${info.messageId}`);

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
