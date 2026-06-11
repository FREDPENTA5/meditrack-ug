import { supabase } from '@/lib/supabase';
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
  const { data, error } = await supabase.from('facilities').select(`*, districts(name)`);

  if (error) {
    throw new Error(error.message || 'Failed to load facilities');
  }

  return (data || []).map((f: any) => ({
    id: f.id,
    name: f.name,
    code: f.code,
    level: f.level,
    districtId: f.district_id,
    districtName: f.districts?.name || 'Unknown',
    latitude: f.latitude,
    longitude: f.longitude,
    address: f.address,
    contactPhone: f.contact_phone,
    isActive: f.is_active,
  }));
}

export async function fetchFacility(id: string): Promise<FacilityDetail> {
  const { data, error } = await supabase
    .from('facilities')
    .select(`*, districts(name)`)
    .eq('id', id)
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Facility not found');
  }

  // To fetch workers we would join users table, but users references auth.users
  // For now we will return an empty array for workers since we don't have user seed data yet
  return {
    id: data.id,
    name: data.name,
    code: data.code,
    level: data.level,
    districtId: data.district_id,
    districtName: data.districts?.name || 'Unknown',
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address,
    contactPhone: data.contact_phone,
    isActive: data.is_active,
    workers: [],
  };
}

export async function fetchFacilityStock(id: string): Promise<StockRow[]> {
  return fetchStockFromStockApi(id);
}

export interface DistrictOption {
  id: string;
  name: string;
}

export async function fetchDistricts(): Promise<DistrictOption[]> {
  const { data, error } = await supabase.from('districts').select('id, name').order('name');
  if (error) throw new Error(error.message);
  return (data ?? []).map((d: any) => ({ id: d.id, name: d.name }));
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
  const { data, error } = await supabase
    .from('facilities')
    .insert({
      name: input.name,
      code: input.code,
      level: input.level,
      district_id: input.districtId,
      latitude: input.latitude,
      longitude: input.longitude,
      address: input.address || null,
      contact_phone: input.contactPhone || null,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select('*, districts(name)')
    .single();

  if (error || !data) throw new Error(error?.message ?? 'Failed to create facility');

  return {
    id: data.id,
    name: data.name,
    code: data.code,
    level: data.level,
    districtId: data.district_id,
    districtName: (data as any).districts?.name ?? 'Unknown',
    latitude: data.latitude,
    longitude: data.longitude,
    address: data.address,
    contactPhone: data.contact_phone,
    isActive: data.is_active,
  };
}

export async function setFacilityActive(id: string, isActive: boolean): Promise<void> {
  const { error } = await supabase
    .from('facilities')
    .update({ is_active: isActive, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw new Error(error.message);
}
