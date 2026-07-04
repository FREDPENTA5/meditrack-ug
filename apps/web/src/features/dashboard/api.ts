import type { DashboardSummary, FacilityMapCollection, ApiResponse } from '@meditrack/shared';
import { api } from '@/lib/api';

export interface DashboardAlert {
  id: string;
  facilityId: string;
  facilityName: string;
  drugName: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  type: string;
  message: string;
  status: string;
  createdAt: string;
}

export async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const res = await api.get<ApiResponse<DashboardSummary>>('/dashboard/summary');
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to fetch dashboard summary');
  }
  return res.data.data;
}

export async function fetchDashboardMap(): Promise<FacilityMapCollection> {
  const res = await api.get<ApiResponse<FacilityMapCollection>>('/dashboard/map');
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to fetch dashboard map');
  }
  return res.data.data;
}

export async function fetchRecentAlerts(limit = 10): Promise<DashboardAlert[]> {
  const res = await api.get<ApiResponse<DashboardAlert[]>>(`/dashboard/alerts?limit=${limit}`);
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to fetch recent alerts');
  }
  return res.data.data;
}
