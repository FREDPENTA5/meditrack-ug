import { z } from 'zod';
import { StockStatusSchema } from './stock';

export const DashboardSummarySchema = z.object({
  totalFacilities: z.number().optional(),
  stockoutsToday: z.number().optional(),
  lowStockDrugs: z.number().optional(),
  unresolvedAlerts: z.number().optional(),
  drugsOk: z.number().optional(),
  drugsLow: z.number().optional(),
  drugsAtZero: z.number().optional(),
});

export const FacilityMapFeatureSchema = z.object({
  type: z.literal('Feature'),
  geometry: z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  properties: z.object({
    id: z.string(),
    name: z.string(),
    code: z.string(),
    status: StockStatusSchema,
    criticalDrugs: z.number(),
  }),
});

export const FacilityMapCollectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(FacilityMapFeatureSchema),
});

export type DashboardSummary = z.infer<typeof DashboardSummarySchema>;
export type FacilityMapCollection = z.infer<typeof FacilityMapCollectionSchema>;
