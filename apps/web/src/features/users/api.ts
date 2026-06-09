import type { ApiResponse, UserListItem } from '@meditrack/shared';
import { api } from '@/lib/api';

export async function fetchUsers(): Promise<UserListItem[]> {
  const response = await api.get<ApiResponse<UserListItem[]>>('/users');
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load users');
  }
  return response.data.data;
}

export async function setUserActive(id: string, isActive: boolean) {
  const response = await api.patch<ApiResponse<UserListItem>>(`/users/${id}/status`, { isActive });
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to update user');
  }
  return response.data.data;
}
