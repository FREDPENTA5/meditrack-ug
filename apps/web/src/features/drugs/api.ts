import type { Drug, ApiResponse } from '@meditrack/shared';
import { api } from '@/lib/api';

export async function fetchDrugs(search?: string): Promise<Drug[]> {
  const url = search?.trim() ? `/drugs?search=${encodeURIComponent(search.trim())}` : '/drugs';
  const res = await api.get<ApiResponse<Drug[]>>(url);

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to load drugs');
  }

  return res.data.data;
}
