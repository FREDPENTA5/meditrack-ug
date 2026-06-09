import type { ApiResponse, Drug } from '@meditrack/shared';
import { api } from '@/lib/api';

export async function fetchDrugs(search?: string): Promise<Drug[]> {
  const response = await api.get<ApiResponse<Drug[]>>('/drugs', {
    params: { page: 1, pageSize: 100, search },
  });
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load drugs');
  }
  return response.data.data;
}
