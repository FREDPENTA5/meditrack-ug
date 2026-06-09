import type { ApiResponse, DashboardSummary, FacilityMapCollection } from '@meditrack/shared';
import { api } from '../../lib/api';

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
  const response = await api.get<ApiResponse<DashboardSummary>>('/dashboard/summary');
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load dashboard');
  }
  return response.data.data;
}

export async function fetchDashboardMap(): Promise<FacilityMapCollection> {
  const response = await api.get<ApiResponse<FacilityMapCollection>>('/dashboard/map');
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load map data');
  }
  return response.data.data;
}

export async function fetchRecentAlerts(limit = 10): Promise<DashboardAlert[]> {
  const response = await api.get<ApiResponse<DashboardAlert[]>>('/dashboard/alerts', {
    params: { limit },
  });
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load alerts');
  }
  return response.data.data;
}
