import type { AuthUser, LoginInput, LoginResponse } from '@meditrack/shared';
import { fetchAuthProfile } from '../../lib/authUser';
import { supabase } from '../../lib/supabase';

export async function loginRequest(input: LoginInput): Promise<LoginResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: input.email,
    password: input.password,
  });

  if (error) {
    throw new Error(error.message === 'Invalid login credentials' ? 'Invalid email or password' : error.message);
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
