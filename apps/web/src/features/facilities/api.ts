import type { ApiResponse } from '@meditrack/shared';
import { api } from '@/lib/api';
import type { StockRow } from '@/features/stock/api';

export interface FacilityListItem {
  id: string;
  name: string;
  code: string;
  level: string;
  districtId: string;
  districtName: string;
  latitude: number;
  longitude: number;
  address?: string | null;
  contactPhone?: string | null;
  isActive: boolean;
}

export interface FacilityDetail extends FacilityListItem {
  workers?: { id: string; fullName: string; email: string; role: string }[];
}

export async function fetchFacilities(): Promise<FacilityListItem[]> {
  const response = await api.get<ApiResponse<FacilityListItem[]>>('/facilities');
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load facilities');
  }
  return response.data.data;
}

export async function fetchFacility(id: string): Promise<FacilityDetail> {
  const response = await api.get<ApiResponse<FacilityDetail>>(`/facilities/${id}`);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Facility not found');
  }
  return response.data.data;
}

export async function fetchFacilityStock(id: string): Promise<StockRow[]> {
  const response = await api.get<ApiResponse<StockRow[]>>(`/facilities/${id}/stock`);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load facility stock');
  }
  return response.data.data;
}
