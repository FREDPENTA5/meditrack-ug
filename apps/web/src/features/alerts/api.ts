import type { ApiResponse, UpdateAlertStatusInput } from '@meditrack/shared';
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
  const response = await api.get<ApiResponse<AlertItem[]>>('/alerts', { params });
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load alerts');
  }
  return { items: response.data.data, meta: response.data.meta };
}

export async function fetchAlert(id: string): Promise<AlertItem> {
  const response = await api.get<ApiResponse<AlertItem>>(`/alerts/${id}`);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Alert not found');
  }
  return response.data.data;
}

export async function updateAlertStatus(id: string, input: UpdateAlertStatusInput) {
  const response = await api.patch<ApiResponse<AlertItem>>(`/alerts/${id}/status`, input);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to update alert');
  }
  return response.data.data;
}
