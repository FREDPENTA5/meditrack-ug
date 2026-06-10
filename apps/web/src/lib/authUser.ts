import type { AuthUser } from '@meditrack/shared';
import { supabase } from './supabase';

export async function fetchAuthProfile(userId: string): Promise<AuthUser> {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, full_name, role, facility_id, district_id, is_active')
    .eq('id', userId)
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? 'User profile not found');
  }

  if (!data.is_active) {
    throw new Error('This account has been deactivated');
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name,
    role: data.role,
    facilityId: data.facility_id,
    districtId: data.district_id,
  };
}

export async function requireAuthProfile(): Promise<AuthUser> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    throw new Error('Not authenticated');
  }

  return fetchAuthProfile(session.user.id);
}
