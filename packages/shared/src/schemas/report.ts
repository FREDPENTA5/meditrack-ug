import { z } from 'zod';

export const ReportSummarySchema = z.object({
  periodLabel: z.string(),
  totalFacilities: z.number(),
  totalDrugsTracked: z.number(),
  stockouts: z.number(),
  lowStock: z.number(),
  criticalStock: z.number(),
  activeAlerts: z.number(),
  resolvedAlerts: z.number(),
  alertsBySeverity: z.object({
    critical: z.number(),
    warning: z.number(),
    info: z.number(),
  }),
  stockByStatus: z.object({
    adequate: z.number(),
    low: z.number(),
    critical: z.number(),
    stockout: z.number(),
  }),
});

export type ReportSummary = z.infer<typeof ReportSummarySchema>;
