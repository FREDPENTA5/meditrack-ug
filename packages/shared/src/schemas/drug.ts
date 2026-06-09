import { z } from 'zod';

export const DrugCategorySchema = z.enum([
  'ANTIBIOTIC',
  'ANTIMALARIAL',
  'ARV',
  'ANALGESIC',
  'ANTIHYPERTENSIVE',
  'ANTIDIABETIC',
  'VACCINE',
  'MATERNAL_HEALTH',
  'SURGICAL_SUPPLY',
  'DIAGNOSTIC',
  'OTHER',
]);

export const DrugSchema = z.object({
  id: z.string(),
  name: z.string(),
  genericName: z.string(),
  category: DrugCategorySchema,
  unit: z.string(),
  emhsCode: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
});

export type DrugCategory = z.infer<typeof DrugCategorySchema>;
export type Drug = z.infer<typeof DrugSchema>;
