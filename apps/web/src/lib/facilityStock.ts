import type { AuthUser } from '@meditrack/shared';
import { getFacilityScope } from './scope';
import { supabase } from './supabase';

type StockStatus = 'ADEQUATE' | 'LOW' | 'CRITICAL' | 'STOCKOUT';

export interface FacilityWithStock {
  id: string;
  name: string;
  code: string;
  latitude: number;
  longitude: number;
  districtId: string;
  latestByDrug: Map<string, StockStatus>;
}

async function fetchScopedFacilityIds(user: AuthUser): Promise<string[] | null> {
  const scope = getFacilityScope(user);
  let query = supabase.from('facilities').select('id').eq('is_active', true);

  if (scope.facilityId) {
    query = query.eq('id', scope.facilityId);
  } else if (scope.districtId) {
    query = query.eq('district_id', scope.districtId);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (data || []).map((row) => row.id);
}

export async function fetchFacilitiesWithLatestStock(user: AuthUser): Promise<FacilityWithStock[]> {
  const facilityIds = await fetchScopedFacilityIds(user);

  let facilitiesQuery = supabase
    .from('facilities')
    .select('id, name, code, latitude, longitude, district_id')
    .eq('is_active', true);

  if (facilityIds?.length) {
    facilitiesQuery = facilitiesQuery.in('id', facilityIds);
  } else if (facilityIds && facilityIds.length === 0) {
    return [];
  }

  const { data: facilities, error: facilitiesError } = await facilitiesQuery;
  if (facilitiesError) throw new Error(facilitiesError.message);

  const ids = (facilities || []).map((f) => f.id);
  if (!ids.length) return [];

  const { data: stockRows, error: stockError } = await supabase
    .from('stock_entries')
    .select('facility_id, drug_id, status, entry_date')
    .in('facility_id', ids)
    .order('entry_date', { ascending: false });

  if (stockError) throw new Error(stockError.message);

  const stockByFacility = new Map<string, Map<string, StockStatus>>();

  for (const row of stockRows || []) {
    if (!stockByFacility.has(row.facility_id)) {
      stockByFacility.set(row.facility_id, new Map());
    }
    const latest = stockByFacility.get(row.facility_id)!;
    if (!latest.has(row.drug_id)) {
      latest.set(row.drug_id, row.status as StockStatus);
    }
  }

  return (facilities || []).map((facility) => ({
    id: facility.id,
    name: facility.name,
    code: facility.code,
    latitude: facility.latitude,
    longitude: facility.longitude,
    districtId: facility.district_id,
    latestByDrug: stockByFacility.get(facility.id) ?? new Map(),
  }));
}

export async function countActiveAlerts(user: AuthUser): Promise<number> {
  const facilityIds = await fetchScopedFacilityIds(user);
  let query = supabase
    .from('alerts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'ACTIVE');

  if (facilityIds?.length) {
    query = query.in('facility_id', facilityIds);
  } else if (facilityIds && facilityIds.length === 0) {
    return 0;
  }

  const { count, error } = await query;
  if (error) throw new Error(error.message);
  return count || 0;
}

export async function countStockoutsToday(user: AuthUser): Promise<number> {
  const facilityIds = await fetchScopedFacilityIds(user);
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  let query = supabase
    .from('stock_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'STOCKOUT')
    .gte('entry_date', startOfDay.toISOString());

  if (facilityIds?.length) {
    query = query.in('facility_id', facilityIds);
  } else if (facilityIds && facilityIds.length === 0) {
    return 0;
  }

  const { count, error } = await query;
  if (error) throw new Error(error.message);
  return count || 0;
}
