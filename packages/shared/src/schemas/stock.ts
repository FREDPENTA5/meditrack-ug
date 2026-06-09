import { z } from 'zod';

export const StockStatusSchema = z.enum(['ADEQUATE', 'LOW', 'CRITICAL', 'STOCKOUT']);

export const StockEntrySchema = z.object({
  id: z.string(),
  facilityId: z.string(),
  drugId: z.string(),
  quantity: z.number(),
  unit: z.string(),
  reportedById: z.string(),
  entryDate: z.coerce.date(),
  notes: z.string().nullable().optional(),
  status: StockStatusSchema,
  daysRemaining: z.number().nullable().optional(),
  createdAt: z.coerce.date(),
});

export const CreateStockEntrySchema = z.object({
  facilityId: z.string(),
  drugId: z.string(),
  quantity: z.number().min(0),
  unit: z.string(),
  notes: z.string().optional(),
});

export const BatchStockEntrySchema = z.object({
  facilityId: z.string(),
  entries: z.array(
    z.object({
      drugId: z.string(),
      quantity: z.number().min(0),
      unit: z.string(),
      notes: z.string().optional(),
    }),
  ),
});

export type StockStatus = z.infer<typeof StockStatusSchema>;
export type StockEntry = z.infer<typeof StockEntrySchema>;
export type CreateStockEntryInput = z.infer<typeof CreateStockEntrySchema>;
export type BatchStockEntryInput = z.infer<typeof BatchStockEntrySchema>;
