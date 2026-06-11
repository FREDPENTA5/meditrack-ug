import type { UserListItem, ApiResponse, RegisterInput } from '@meditrack/shared';
import { api } from '@/lib/api';
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

export async function createUser(input: RegisterInput): Promise<UserListItem> {
  // Step 1: Create the Supabase Auth user so they can log in.
  // signUp creates the auth.users record; email confirmation is off for admin-created users.
  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      // Prevent Supabase from auto-signing in as the new user
      emailRedirectTo: undefined,
      data: {
        full_name: input.fullName,
        role: input.role,
      },
    },
  });

  if (signUpError) throw new Error(signUpError.message);
  if (!authData.user) throw new Error('Failed to create auth user');

  const userId = authData.user.id;

  // Step 2: Insert the application profile into public.users.
  // This may already exist if a DB trigger created it on auth.users insert.
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .maybeSingle();

  if (!existing) {
    const { error: insertError } = await supabase.from('users').insert({
      id: userId,
      email: input.email,
      full_name: input.fullName,
      role: input.role,
      facility_id: input.facilityId ?? null,
      district_id: input.districtId ?? null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (insertError) throw new Error(insertError.message);
  } else {
    // Profile exists (created by trigger) — update role and name
    await supabase
      .from('users')
      .update({
        full_name: input.fullName,
        role: input.role,
        facility_id: input.facilityId ?? null,
        district_id: input.districtId ?? null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
  }

  // Step 3: Return the created user profile
  const { data: profile, error: fetchError } = await supabase
    .from('users')
    .select('*, facilities(name), districts(name)')
    .eq('id', userId)
    .single();

  if (fetchError || !profile) throw new Error(fetchError?.message ?? 'Failed to fetch new user');

  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    phone: profile.phone ?? null,
    role: profile.role,
    facilityId: profile.facility_id,
    districtId: profile.district_id,
    facilityName: profile.facilities?.name ?? null,
    districtName: profile.districts?.name ?? null,
    isActive: profile.is_active,
    lastLoginAt: profile.last_login_at ? new Date(profile.last_login_at) : null,
    createdAt: new Date(profile.created_at),
  };
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
