import type { AuthUser, UpdateProfileInput, ApiResponse } from '@meditrack/shared';
import { api } from '@/lib/api';
import { fetchAuthProfile } from '@/lib/authUser';
import { supabase } from '@/lib/supabase';

export async function updateProfile(input: UpdateProfileInput): Promise<AuthUser> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  const res = await api.patch<ApiResponse<AuthUser>>('/users/me/profile', input);

  if (!res.data.success) {
    throw new Error(res.data.error?.message ?? 'Failed to update profile');
  }

  return fetchAuthProfile(user.id);
}
