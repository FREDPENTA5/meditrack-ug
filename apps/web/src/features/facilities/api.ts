import { api } from '@/lib/api';
import type { ApiResponse } from '@meditrack/shared';
import type { StockRow } from '@/features/stock/api';
import { fetchFacilityStock as fetchStockFromStockApi } from '@/features/stock/api';

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
  const res = await api.get<ApiResponse<FacilityListItem[]>>('/facilities');
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to load facilities');
  }
  return res.data.data;
}

export async function fetchFacility(id: string): Promise<FacilityDetail> {
  const res = await api.get<ApiResponse<FacilityDetail>>(`/facilities/${id}`);
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Facility not found');
  }
  return res.data.data;
}

export async function fetchFacilityStock(id: string): Promise<StockRow[]> {
  return fetchStockFromStockApi(id);
}

export interface DistrictOption {
  id: string;
  name: string;
}

export async function fetchDistricts(): Promise<DistrictOption[]> {
  const res = await api.get<ApiResponse<DistrictOption[]>>('/districts');
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to load districts');
  }
  return res.data.data;
}

export interface CreateFacilityInput {
  name: string;
  code: string;
  level: string;
  districtId: string;
  latitude: number;
  longitude: number;
  address?: string;
  contactPhone?: string;
}

export async function createFacility(input: CreateFacilityInput): Promise<FacilityListItem> {
  const res = await api.post<ApiResponse<FacilityListItem>>('/facilities', input);
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to create facility');
  }
  return res.data.data;
}

export async function setFacilityActive(id: string, isActive: boolean): Promise<void> {
  const res = await api.patch<ApiResponse<void>>(`/facilities/${id}/status`, { isActive });
  if (!res.data.success) {
    throw new Error(res.data.error?.message ?? 'Failed to update facility status');
  }
}
