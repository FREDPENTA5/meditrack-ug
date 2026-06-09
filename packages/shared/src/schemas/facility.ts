import { z } from 'zod';

export const FacilityLevelSchema = z.enum([
  'HC_II',
  'HC_III',
  'HC_IV',
  'GENERAL_HOSPITAL',
  'REGIONAL_REFERRAL',
]);

export const FacilitySchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  level: FacilityLevelSchema,
  districtId: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().nullable().optional(),
  contactPhone: z.string().nullable().optional(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type FacilityLevel = z.infer<typeof FacilityLevelSchema>;
export type Facility = z.infer<typeof FacilitySchema>;
