import type { AuthUser, UpdateProfileInput } from '@meditrack/shared';
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

  const { error } = await supabase
    .from('users')
    .update({
      full_name: input.fullName,
      phone: input.phone ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id);

  if (error) {
    throw new Error(error.message || 'Failed to update profile');
  }

  return fetchAuthProfile(user.id);
}
