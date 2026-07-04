import type { UserListItem, RegisterInput, ApiResponse } from '@meditrack/shared';
import { api } from '@/lib/api';

export async function fetchUsers(): Promise<UserListItem[]> {
  const res = await api.get<ApiResponse<UserListItem[]>>('/users');
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to load users');
  }
  return res.data.data;
}

export async function createUser(input: RegisterInput): Promise<UserListItem> {
  const res = await api.post<ApiResponse<UserListItem>>('/users', input);
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to create user');
  }
  return res.data.data;
}

export async function setUserActive(id: string, isActive: boolean): Promise<UserListItem> {
  const res = await api.patch<ApiResponse<UserListItem>>(`/users/${id}/status`, { isActive });
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to update user');
  }
  return res.data.data;
}
