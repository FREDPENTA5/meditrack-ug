import express from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { sendEmailAlertMock, getTransporterMock, getEmailProviderMock } = vi.hoisted(() => ({
  sendEmailAlertMock: vi.fn(),
  getTransporterMock: vi.fn(),
  getEmailProviderMock: vi.fn(),
}));

vi.mock('../lib/nodemailer', () => ({
  sendEmailAlert: sendEmailAlertMock,
  getTransporter: getTransporterMock,
  getEmailProvider: getEmailProviderMock,
}));

import { apiRouter } from './index';

function createApp() {
  const app = express();
  app.use('/api', apiRouter);
  return app;
}

describe('GET /debug/email', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getEmailProviderMock.mockReturnValue('resend');
    sendEmailAlertMock.mockResolvedValue(true);
  });

  it('uses the provided to query parameter', async () => {
    const app = createApp();

    const response = await request(app).get('/api/debug/email?to=alerts@example.com');

    expect(sendEmailAlertMock).toHaveBeenCalledWith(
      'alerts@example.com',
      'Debug Test',
      'Testing from API',
    );
    expect(response.status).toBe(200);
    expect(response.body.to).toBe('alerts@example.com');
  });

  it('falls back to the default recipient when the query parameter is blank', async () => {
    const app = createApp();

    const response = await request(app).get('/api/debug/email?to=');

    expect(sendEmailAlertMock).toHaveBeenCalledWith(
      'fredmeghanpenta@gmail.com',
      'Debug Test',
      'Testing from API',
    );
    expect(response.status).toBe(200);
    expect(response.body.to).toBe('fredmeghanpenta@gmail.com');
  });
});
