import { z } from 'zod';
import { DrugCategorySchema } from './drug';

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const DrugListQuerySchema = PaginationQuerySchema.extend({
  category: DrugCategorySchema.optional(),
  search: z.string().optional(),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
export type DrugListQuery = z.infer<typeof DrugListQuerySchema>;
