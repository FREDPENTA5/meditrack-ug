import type { AuthUser, UpdateProfileInput, ApiResponse } from '@meditrack/shared';
import { api } from '@/lib/api';

export async function updateProfile(input: UpdateProfileInput): Promise<AuthUser> {
  const res = await api.patch<ApiResponse<AuthUser>>('/users/me/profile', input);

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to update profile');
  }

  return res.data.data;
}
