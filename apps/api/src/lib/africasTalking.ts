const Africastalking = require('africastalking');
import { env } from '../config/env';
import { logger } from '../utils/logger';

const credentials = {
  apiKey: env.AT_API_KEY,
  username: env.AT_USERNAME,
};

const africastalking = Africastalking(credentials);
export const sms = africastalking.SMS;

export async function sendSmsAlert(to: string, message: string) {
  try {
    const options = {
      to: [to],
      message,
    };

    // In a real environment, you'd probably check if AT_API_KEY is actually set
    if (!env.AT_API_KEY || env.AT_API_KEY === '') {
      logger.warn(`Skipping SMS to ${to} because AT_API_KEY is not configured.`);
      return false;
    }

    if (env.AT_API_KEY === 'mock-api-key') {
      logger.info(`[MOCK] SMS sent successfully to ${to}`);
      return true;
    }

    const response = await sms.send(options);
    logger.info(`SMS sent successfully to ${to}`, { response });
    return true;
  } catch (error) {
    logger.error(`Failed to send SMS to ${to}:`, error);
    return false;
  }
}
