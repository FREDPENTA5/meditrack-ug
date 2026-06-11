import { requireAuthProfile } from '@/lib/authUser';
import { getFacilityScope } from '@/lib/scope';
import { supabase } from '@/lib/supabase';

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
  const user = await requireAuthProfile();
  const scope = getFacilityScope(user);
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 50;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('alerts')
    .select(
      `
      id,
      severity,
      type,
      message,
      status,
      sms_delivered,
      created_at,
      updated_at,
      resolved_at,
      drug_name,
      drug_id,
      facility_id,
      facilities ( name, code )
    `,
      { count: 'exact' },
    )
    .order('created_at', { ascending: false })
    .range(from, to);

  // Apply status / severity filters
  if (params?.status) query = query.eq('status', params.status);
  if (params?.severity) query = query.eq('severity', params.severity);

  // Apply scope: facility workers see their facility, district officers see their district
  if (scope.facilityId) {
    query = query.eq('facility_id', scope.facilityId);
  } else if (scope.districtId) {
    const { data: districtFacilities, error: dfe } = await supabase
      .from('facilities')
      .select('id')
      .eq('district_id', scope.districtId);

    if (dfe) throw new Error(dfe.message);
    const ids = (districtFacilities ?? []).map((f) => f.id);
    if (!ids.length) {
      return { items: [], meta: { total: 0, page, pageSize, totalPages: 0 } };
    }
    query = query.in('facility_id', ids);
  }

  const { data, count, error } = await query;
  if (error) throw new Error(error.message);

  const items: AlertItem[] = (data ?? []).map((row: any) => {
    const facility = Array.isArray(row.facilities) ? row.facilities[0] : row.facilities;
    return {
      id: row.id,
      facilityId: row.facility_id,
      facilityName: facility?.name ?? 'Unknown Facility',
      facilityCode: facility?.code,
      drugId: row.drug_id,
      drugName: row.drug_name ?? 'Unknown Drug',
      severity: row.severity as AlertItem['severity'],
      type: row.type,
      message: row.message,
      status: row.status,
      smsDelivered: row.sms_delivered,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      resolvedAt: row.resolved_at,
    };
  });

  const total = count ?? items.length;

  return {
    items,
    meta: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
}

export async function fetchAlert(id: string): Promise<AlertItem> {
  const { data, error } = await supabase
    .from('alerts')
    .select(
      `
      id,
      severity,
      type,
      message,
      status,
      sms_delivered,
      created_at,
      updated_at,
      resolved_at,
      drug_name,
      drug_id,
      facility_id,
      facilities ( name, code )
    `,
    )
    .eq('id', id)
    .single();

  if (error || !data) throw new Error(error?.message ?? 'Alert not found');

  const facility = Array.isArray(data.facilities) ? data.facilities[0] : data.facilities;
  return {
    id: data.id,
    facilityId: data.facility_id,
    facilityName: (facility as any)?.name ?? 'Unknown Facility',
    facilityCode: (facility as any)?.code,
    drugId: data.drug_id,
    drugName: data.drug_name ?? 'Unknown Drug',
    severity: data.severity as AlertItem['severity'],
    type: data.type,
    message: data.message,
    status: data.status,
    smsDelivered: data.sms_delivered,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    resolvedAt: data.resolved_at,
  };
}

export async function updateAlertStatus(id: string, input: { status: string }) {
  const { data, error } = await supabase
    .from('alerts')
    .update({
      status: input.status,
      resolved_at: input.status === 'RESOLVED' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(
      `
      id,
      severity,
      type,
      message,
      status,
      sms_delivered,
      created_at,
      updated_at,
      resolved_at,
      drug_name,
      drug_id,
      facility_id,
      facilities ( name, code )
    `,
    )
    .single();

  if (error || !data) throw new Error(error?.message ?? 'Failed to update alert');

  const facility = Array.isArray(data.facilities) ? data.facilities[0] : data.facilities;
  return {
    id: data.id,
    facilityId: data.facility_id,
    facilityName: (facility as any)?.name ?? 'Unknown Facility',
    facilityCode: (facility as any)?.code,
    drugId: data.drug_id,
    drugName: data.drug_name ?? 'Unknown Drug',
    severity: data.severity as AlertItem['severity'],
    type: data.type,
    message: data.message,
    status: data.status,
    smsDelivered: data.sms_delivered,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    resolvedAt: data.resolved_at,
  } as AlertItem;
}
