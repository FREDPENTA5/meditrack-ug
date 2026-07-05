import type { AuthUser, LoginInput, RegisterInput, LoginResponse } from '@meditrack/shared';
import type { ApiResponse } from '@meditrack/shared';
import { api } from '../../lib/api';

export async function loginRequest(input: LoginInput): Promise<LoginResponse> {
  const res = await api.post<ApiResponse<LoginResponse>>('/auth/login', input);

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Login failed');
  }

  return res.data.data;
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
  const res = await api.post<ApiResponse<null>>('/auth/logout');
  if (!res.data.success) {
    throw new Error(res.data.error?.message ?? 'Logout failed');
  }
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const res = await api.get<ApiResponse<AuthUser>>('/auth/me');
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Not authenticated');
  }
  return res.data.data;
}

export async function refreshSessionRequest(): Promise<LoginResponse> {
  const res = await api.post<ApiResponse<LoginResponse>>('/auth/refresh');
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Session expired');
  }
  return res.data.data;
}
