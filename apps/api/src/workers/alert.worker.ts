import { Worker, Job } from 'bullmq';
import { redis } from '../lib/redis';
import { sendSmsAlert } from '../lib/africasTalking';
import { logger } from '../utils/logger';
import { alertRepository } from '../repositories/alert.repository';

export interface AlertJobData {
  alertId: string;
  phone: string;
  message: string;
}

export const alertWorker = new Worker<AlertJobData>(
  'alert-queue',
  async (job: Job<AlertJobData>) => {
    logger.info(`Processing alert job ${job.id} for alert ${job.data.alertId}`);
    const { alertId, phone, message } = job.data;

    // Send the SMS via Africa's Talking
    const success = await sendSmsAlert(phone, message);

    if (success) {
      // Update the database to reflect that the SMS was delivered
      await alertRepository.markSmsDelivered(alertId);
      logger.info(`Marked SMS delivered for alert ${alertId}`);
    } else {
      throw new Error(`Failed to send SMS for alert ${alertId}`);
    }
  },
  {
    connection: redis as any,
    concurrency: 5, // Process up to 5 alerts concurrently
  },
);

alertWorker.on('completed', (job) => {
  logger.info(`Alert job ${job.id} has completed!`);
});

alertWorker.on('failed', (job, err) => {
  logger.error(`Alert job ${job?.id} has failed with ${err.message}`);
});
