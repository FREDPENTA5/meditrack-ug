import { Worker, Job } from 'bullmq';
import { redis } from '../lib/redis';
import { sendSmsAlert } from '../lib/africasTalking';
import { sendEmailAlert } from '../lib/nodemailer';
import { logger } from '../utils/logger';
import { alertRepository } from '../repositories/alert.repository';

export interface AlertJobData {
  alertId: string;
  phone?: string;
  email?: string;
  message: string;
}

export const alertWorker = new Worker<AlertJobData>(
  'alert-queue',
  async (job: Job<AlertJobData>) => {
    logger.info(`Processing alert job ${job.id} for alert ${job.data.alertId}`);
    const { alertId, phone, email, message } = job.data;

    let smsSuccess = false;
    let emailSuccess = false;

    if (phone) {
      smsSuccess = await sendSmsAlert(phone, message);
    }

    if (email) {
      const htmlMessage = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #dc2626;">MediTrack Critical Alert</h2>
          <p style="font-size: 16px; color: #374151;">${message}</p>
          <hr style="border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 12px; color: #9ca3af;">Please log in to the MediTrack portal to view and resolve this alert.</p>
        </div>
      `;
      emailSuccess = await sendEmailAlert(email, 'MediTrack Critical Alert', htmlMessage);
    }

    if (smsSuccess || emailSuccess) {
      // Update the database to reflect that the alert was delivered
      await alertRepository.markSmsDelivered(alertId);
      logger.info(
        `Marked alert ${alertId} as delivered (SMS: ${smsSuccess}, Email: ${emailSuccess})`,
      );
    } else {
      throw new Error(`Failed to send alert ${alertId} (no delivery channels succeeded)`);
    }
  },
  {
    connection: redis as any,
    concurrency: 5,
  },
);

alertWorker.on('completed', (job) => {
  logger.info(`Alert job ${job.id} has completed!`);
});

alertWorker.on('failed', (job, err) => {
  logger.error(`Alert job ${job?.id} has failed with ${err.message}`);
});
