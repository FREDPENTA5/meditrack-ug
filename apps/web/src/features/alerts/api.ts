import type { ApiResponse } from '@meditrack/shared';
import { api } from '@/lib/api';

export interface AlertItem {
  id: string;
  facilityId: string;
  facilityName: string;
  facilityCode?: string;
  drugId?: string | null;
  drugName: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  type: string;
  message: string;
  status: string;
  smsDelivered?: boolean;
  createdAt: string;
  updatedAt?: string;
  resolvedAt?: string | null;
}

export async function fetchAlerts(params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  severity?: string;
}) {
  const query = new URLSearchParams();
  if (params?.page) query.append('page', String(params.page));
  if (params?.pageSize) query.append('pageSize', String(params.pageSize));
  if (params?.status) query.append('status', params.status);
  if (params?.severity) query.append('severity', params.severity);

  const res = await api.get<ApiResponse<AlertItem[]>>(`/alerts?${query.toString()}`);

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to fetch alerts');
  }

  return {
    items: res.data.data,
    meta: res.data.meta ?? {
      total: res.data.data.length,
      page: params?.page ?? 1,
      pageSize: params?.pageSize ?? 50,
      totalPages: 1,
    },
  };
}

export async function fetchAlert(id: string): Promise<AlertItem> {
  const res = await api.get<ApiResponse<AlertItem>>(`/alerts/${id}`);

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Alert not found');
  }

  return res.data.data;
}

export async function updateAlertStatus(id: string, input: { status: string }) {
  const res = await api.patch<ApiResponse<AlertItem>>(`/alerts/${id}/status`, input);

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to update alert');
  }

  return res.data.data;
}
