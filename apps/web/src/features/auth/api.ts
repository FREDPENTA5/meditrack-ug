import type { AuthUser, LoginInput, RegisterInput, LoginResponse } from '@meditrack/shared';
import type { ApiResponse } from '@meditrack/shared';
import { fetchAuthProfile } from '../../lib/authUser';
import { supabase } from '../../lib/supabase';
import { api } from '../../lib/api';

export async function loginRequest(input: LoginInput): Promise<LoginResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error) {
    throw new Error(
      error.message === 'Invalid login credentials' ? 'Invalid email or password' : error.message,
    );
  }

  if (!data.session || !data.user) {
    throw new Error('Login failed');
  }

  const user = await fetchAuthProfile(data.user.id);

  await supabase
    .from('users')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', data.user.id);

  return {
    user,
    accessToken: data.session.access_token,
  };
}

export async function registerRequest(
  input: RegisterInput,
): Promise<{ user: LoginResponse['user'] }> {
  const response = await api.post<ApiResponse<{ user: LoginResponse['user'] }>>('/users', input);

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Registration failed');
  }

  return response.data.data;
}

export async function logoutRequest(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Not authenticated');
  }

  return fetchAuthProfile(user.id);
}
