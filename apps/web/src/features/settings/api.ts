import type { ApiResponse, AuthUser, UpdateProfileInput } from '@meditrack/shared';
import { api } from '@/lib/api';

export async function updateProfile(input: UpdateProfileInput): Promise<AuthUser> {
  const response = await api.patch<ApiResponse<AuthUser>>('/auth/me', input);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to update profile');
  }
  return response.data.data;
}
