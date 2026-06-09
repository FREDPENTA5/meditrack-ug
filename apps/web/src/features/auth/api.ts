import type { ApiResponse, LoginInput, LoginResponse } from '@meditrack/shared';
import { api } from '../../lib/api';

export async function loginRequest(input: LoginInput): Promise<LoginResponse> {
  const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', input);

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Login failed');
  }

  return response.data.data;
}

export async function logoutRequest(): Promise<void> {
  await api.post('/auth/logout');
}

export async function fetchCurrentUser(): Promise<LoginResponse['user']> {
  const response = await api.get<ApiResponse<LoginResponse['user']>>('/auth/me');

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to fetch user');
  }

  return response.data.data;
}
