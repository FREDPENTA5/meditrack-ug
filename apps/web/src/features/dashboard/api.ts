import type { DashboardSummary, FacilityMapCollection } from '@meditrack/shared';
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
  // Since we are migrating, we can simulate the summary using multiple queries or just return a dummy shape
  // if complex aggregations aren't fully migrated. For now, we do basic queries:
  const { count: facilitiesCount } = await supabase
    .from('facilities')
    .select('*', { count: 'exact', head: true });
  const { count: stockoutsCount } = await supabase
    .from('stock_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'STOCKOUT');
  const { count: lowStockCount } = await supabase
    .from('stock_entries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'LOW');
  const { count: alertsCount } = await supabase
    .from('alerts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'ACTIVE');

  return {
    totalFacilities: facilitiesCount || 0,
    stockoutsToday: stockoutsCount || 0,
    lowStockDrugs: lowStockCount || 0,
    unresolvedAlerts: alertsCount || 0,
    // Facility worker specific
    drugsOk: 0,
    drugsLow: 0,
    drugsAtZero: 0,
  };
}

export async function fetchDashboardMap(): Promise<FacilityMapCollection> {
  const { data, error } = await supabase.from('facilities').select('*').eq('is_active', true);
  if (error) throw error;

  return {
    type: 'FeatureCollection',
    features: (data || []).map((f) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [f.longitude, f.latitude] },
      properties: {
        id: f.id,
        name: f.name,
        code: f.code,
        status: 'OK', // Derive from actual status later
        stockoutCount: 0,
      },
    })),
  };
}

export async function fetchRecentAlerts(limit = 10): Promise<DashboardAlert[]> {
  const { data, error } = await supabase
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

  if (error) throw error;

  return (data || []).map((a: any) => ({
    id: a.id,
    facilityId: a.facility_id,
    facilityName: a.facilities?.name || 'Unknown Facility',
    drugName: a.drug_name || 'Unknown Drug',
    severity: a.severity as any,
    type: a.type,
    message: a.message,
    status: a.status,
    createdAt: a.created_at,
  }));
}
