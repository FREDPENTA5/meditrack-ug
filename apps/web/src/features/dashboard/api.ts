import type { DashboardSummary, FacilityMapCollection } from '@meditrack/shared';
import { requireAuthProfile } from '../../lib/authUser';
import {
  countActiveAlerts,
  countStockoutsToday,
  fetchFacilitiesWithLatestStock,
} from '../../lib/facilityStock';
import { summarizeStatuses, worstStatus } from '../../lib/stockStatus';
import { getFacilityScope } from '../../lib/scope';
import { supabase } from '../../lib/supabase';

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
  const user = await requireAuthProfile();
  const scope = getFacilityScope(user);

  if (user.role === 'FACILITY_WORKER' && scope.facilityId) {
    const facilities = await fetchFacilitiesWithLatestStock(user);
    const facility = facilities[0];
    const statuses = Array.from(facility?.latestByDrug.values() ?? []);
    const counts = summarizeStatuses(statuses);

    return {
      drugsOk: counts.adequate,
      drugsLow: counts.low + counts.critical,
      drugsAtZero: counts.stockout,
      unresolvedAlerts: await countActiveAlerts(user),
    };
  }

  const facilities = await fetchFacilitiesWithLatestStock(user);
  let lowStockDrugs = 0;

  for (const facility of facilities) {
    for (const status of facility.latestByDrug.values()) {
      if (status === 'LOW' || status === 'CRITICAL') lowStockDrugs += 1;
    }
  }

  return {
    totalFacilities: facilities.length,
    stockoutsToday: await countStockoutsToday(user),
    lowStockDrugs,
    unresolvedAlerts: await countActiveAlerts(user),
  };
}

export async function fetchDashboardMap(): Promise<FacilityMapCollection> {
  const user = await requireAuthProfile();
  const facilities = await fetchFacilitiesWithLatestStock(user);

  return {
    type: 'FeatureCollection',
    features: facilities.map((facility) => {
      const statuses = Array.from(facility.latestByDrug.values());
      const status = statuses.length ? worstStatus(statuses) : 'ADEQUATE';
      const criticalDrugs = statuses.filter((s) => s === 'STOCKOUT' || s === 'CRITICAL').length;

      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [facility.longitude, facility.latitude] as [number, number],
        },
        properties: {
          id: facility.id,
          name: facility.name,
          code: facility.code,
          status,
          criticalDrugs,
        },
      };
    }),
  };
}

export async function fetchRecentAlerts(limit = 10): Promise<DashboardAlert[]> {
  const user = await requireAuthProfile();
  const scope = getFacilityScope(user);

  let query = supabase
    .from('alerts')
    .select(
      `
      id,
      severity,
      type,
      message,
      status,
      created_at,
      drug_name,
      facility_id,
      facilities ( name )
    `,
    )
    .order('created_at', { ascending: false })
    .limit(limit);

  if (scope.facilityId) {
    query = query.eq('facility_id', scope.facilityId);
  } else if (scope.districtId) {
    const { data: districtFacilities, error } = await supabase
      .from('facilities')
      .select('id')
      .eq('district_id', scope.districtId);

    if (error) throw new Error(error.message);

    const ids = (districtFacilities || []).map((f) => f.id);
    if (!ids.length) return [];
    query = query.in('facility_id', ids);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  return (data || []).map((a: {
    id: string;
    facility_id: string;
    drug_name: string;
    severity: string;
    type: string;
    message: string;
    status: string;
    created_at: string;
    facilities: { name: string } | null;
  }) => ({
    id: a.id,
    facilityId: a.facility_id,
    facilityName: a.facilities?.name || 'Unknown Facility',
    drugName: a.drug_name || 'Unknown Drug',
    severity: a.severity as DashboardAlert['severity'],
    type: a.type,
    message: a.message,
    status: a.status,
    createdAt: a.created_at,
  }));
}
