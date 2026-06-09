import { z } from 'zod';

export const RoleSchema = z.enum([
  'FACILITY_WORKER',
  'DISTRICT_OFFICER',
  'NMS_ADMIN',
  'SUPER_ADMIN',
]);

export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional().default(false),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
});

export const AuthUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  role: RoleSchema,
  facilityId: z.string().nullable(),
  districtId: z.string().nullable(),
});

export const LoginResponseSchema = z.object({
  user: AuthUserSchema,
  accessToken: z.string(),
});

export type Role = z.infer<typeof RoleSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type AuthUser = z.infer<typeof AuthUserSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
