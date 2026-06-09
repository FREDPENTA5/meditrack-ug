import { z } from 'zod';
import { RoleSchema } from './auth';

export const UpdateProfileSchema = z.object({
  fullName: z.string().min(2).max(120),
  phone: z.string().max(20).optional().nullable(),
});

export const UpdateUserStatusSchema = z.object({
  isActive: z.boolean(),
});

export const UserListItemSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  phone: z.string().nullable(),
  role: RoleSchema,
  facilityId: z.string().nullable(),
  districtId: z.string().nullable(),
  facilityName: z.string().nullable().optional(),
  districtName: z.string().nullable().optional(),
  isActive: z.boolean(),
  lastLoginAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type UpdateUserStatusInput = z.infer<typeof UpdateUserStatusSchema>;
export type UserListItem = z.infer<typeof UserListItemSchema>;
