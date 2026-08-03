const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const nodemailer = require('nodemailer');

const connection = new IORedis(
  'redis://default:7VswivZVSZN0U3UirhMHVLUKt7n2ujMq@umbrous-comparison-fetching-32710.db.redis.io:13863',
  { maxRetriesPerRequest: null },
);

const worker = new Worker(
  'alert-queue',
  async (job) => {
    console.log('Processing job', job.id);
    const { alertId, email, message } = job.data;

    try {
      const t = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user: 'fredmeghanpenta@gmail.com', pass: 'xqdv dkuv vapu zyor' },
      });

      console.log('Sending email...');
      const info = await t.sendMail({
        from: '"MediTrack Alerts" <fredmeghanpenta@gmail.com>',
        to: email,
        subject: 'MediTrack Critical Alert',
        html: `<b>${message}</b>`,
      });
      console.log('Email OK:', info.messageId);
    } catch (e) {
      console.error('NODEMAILER ERROR:', e);
      throw e;
    }
  },
  { connection, concurrency: 1 },
);

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with`, err.message);
  process.exit(1);
});
