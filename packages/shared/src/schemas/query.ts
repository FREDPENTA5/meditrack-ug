import { z } from 'zod';
import { DrugCategorySchema } from './drug';
import { AlertStatusSchema, SeveritySchema } from './alert';

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const DrugListQuerySchema = PaginationQuerySchema.extend({
  category: DrugCategorySchema.optional(),
  search: z.string().optional(),
});

export const AlertListQuerySchema = PaginationQuerySchema.extend({
  status: AlertStatusSchema.optional(),
  severity: SeveritySchema.optional(),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
export type DrugListQuery = z.infer<typeof DrugListQuerySchema>;
export type AlertListQuery = z.infer<typeof AlertListQuerySchema>;
