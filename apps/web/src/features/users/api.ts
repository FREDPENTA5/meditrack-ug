import type { UserListItem, RegisterInput } from '@meditrack/shared';
import { supabase } from '@/lib/supabase';

export async function fetchUsers(): Promise<UserListItem[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*, facilities(name), districts(name)')
    .order('full_name');

  if (error) {
    throw new Error(error.message || 'Failed to load users');
  }

  return (data || []).map((row: any) => ({
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    phone: row.phone ?? null,
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

export async function createUser(input: RegisterInput): Promise<UserListItem> {
  // Get the current session token to send to the edge function
  const {
    data: { session },
    error: sessionErr,
  } = await supabase.auth.getSession();

  if (sessionErr || !session) throw new Error('Not authenticated');

  // Call the edge function (uses service role — does NOT replace current session)
  const supabaseUrl = (supabase as any).supabaseUrl as string;
  const res = await fetch(`${supabaseUrl}/functions/v1/create-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
      fullName: input.fullName,
      role: input.role,
      facilityId: input.facilityId ?? null,
      districtId: input.districtId ?? null,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result?.error ?? 'Failed to create user');
  }

  return {
    ...result,
    lastLoginAt: result.lastLoginAt ? new Date(result.lastLoginAt) : null,
    createdAt: new Date(result.createdAt),
  } as UserListItem;
}

export async function setUserActive(id: string, isActive: boolean): Promise<UserListItem> {
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
    phone: (data as any).phone ?? null,
    role: data.role,
    facilityId: data.facility_id,
    districtId: data.district_id,
    facilityName: (data as any).facilities?.name ?? null,
    districtName: (data as any).districts?.name ?? null,
    isActive: data.is_active,
    lastLoginAt: (data as any).last_login_at ? new Date((data as any).last_login_at) : null,
    createdAt: new Date(data.created_at),
  } satisfies UserListItem;
}
