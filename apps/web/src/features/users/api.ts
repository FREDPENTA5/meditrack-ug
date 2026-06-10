import type { UserListItem } from '@meditrack/shared';
import { supabase } from '@/lib/supabase';

export async function fetchUsers(): Promise<UserListItem[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*, facilities(name), districts(name)')
    .order('full_name');

  if (error) {
    throw new Error(error.message || 'Failed to load users');
  }

  return (data || []).map((row) => ({
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    phone: row.phone,
    role: row.role,
    facilityId: row.facility_id,
    districtId: row.district_id,
    facilityName: row.facilities?.name ?? null,
    districtName: row.districts?.name ?? null,
    isActive: row.is_active,
    lastLoginAt: row.last_login_at ? new Date(row.last_login_at) : null,
    createdAt: new Date(row.created_at),
  }));
}

export async function setUserActive(id: string, isActive: boolean) {
  const { data, error } = await supabase
    .from('users')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*, facilities(name), districts(name)')
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to update user');
  }

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name,
    phone: data.phone,
    role: data.role,
    facilityId: data.facility_id,
    districtId: data.district_id,
    facilityName: data.facilities?.name ?? null,
    districtName: data.districts?.name ?? null,
    isActive: data.is_active,
    lastLoginAt: data.last_login_at ? new Date(data.last_login_at) : null,
    createdAt: new Date(data.created_at),
  } satisfies UserListItem;
}
