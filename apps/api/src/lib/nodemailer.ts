import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';
import { env } from '../config/env';

// Create a reusable transporter object using the default SMTP transport
export async function getTransporter() {
  if (env.SMTP_USER && env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465, // true for 465, false for other ports
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  // Fallback to Ethereal Email for testing if no credentials are provided
  logger.info('No SMTP credentials found. Generating Ethereal test account...');
  const testAccount = await nodemailer.createTestAccount();

  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function sendEmailAlert(to: string, subject: string, html: string): Promise<boolean> {
  try {
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: '"MediTrack Alerts" <alerts@meditrack.ug>',
      to,
      subject,
      html,
    });

    logger.info(`Email sent to ${to}: ${info.messageId}`);

    // Preview only available when sending through an Ethereal account
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      logger.info(`Preview URL: ${previewUrl}`);
    }

    return true;
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error}`);
    return false;
  }
}
