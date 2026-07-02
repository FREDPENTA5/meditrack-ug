import { Queue } from 'bullmq';
import { redis } from './redis';

export const alertQueue = new Queue('alert-queue', {
  connection: redis as any,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
