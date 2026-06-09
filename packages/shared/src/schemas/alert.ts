import { z } from 'zod';

export const SeveritySchema = z.enum(['INFO', 'WARNING', 'CRITICAL']);

export const AlertTypeSchema = z.enum([
  'STOCK_LOW',
  'STOCK_CRITICAL',
  'STOCKOUT',
  'STOCK_EXPIRING',
  'SYSTEM',
]);

export const AlertStatusSchema = z.enum(['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED', 'DISMISSED']);

export const AlertSchema = z.object({
  id: z.string(),
  facilityId: z.string(),
  drugId: z.string().nullable().optional(),
  drugName: z.string(),
  severity: SeveritySchema,
  type: AlertTypeSchema,
  message: z.string(),
  status: AlertStatusSchema,
  resolvedAt: z.coerce.date().nullable().optional(),
  resolvedById: z.string().nullable().optional(),
  smsDelivered: z.boolean(),
  smsSentAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Severity = z.infer<typeof SeveritySchema>;
export type AlertType = z.infer<typeof AlertTypeSchema>;
export type AlertStatus = z.infer<typeof AlertStatusSchema>;
export type Alert = z.infer<typeof AlertSchema>;
