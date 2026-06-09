import type { UpdateAlertStatusInput } from '@meditrack/shared';
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
  let query = supabase
    .from('alerts')
    .select('*, facilities(name, code)', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (params?.status) {
    query = query.eq('status', params.status);
  }
  if (params?.severity) {
    query = query.eq('severity', params.severity);
  }

  // Pagination logic (if needed)
  if (params?.page && params?.pageSize) {
    const from = (params.page - 1) * params.pageSize;
    const to = from + params.pageSize - 1;
    query = query.range(from, to);
  } else {
    // Default limit
    query = query.limit(50);
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message || 'Failed to load alerts');
  }

  const items: AlertItem[] = data.map((d: any) => ({
    id: d.id,
    facilityId: d.facility_id,
    facilityName: d.facilities?.name || 'Unknown Facility',
    facilityCode: d.facilities?.code,
    drugId: d.drug_id,
    drugName: d.drug_name,
    severity: d.severity,
    type: d.type,
    message: d.message,
    status: d.status,
    smsDelivered: d.sms_delivered,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    resolvedAt: d.resolved_at,
  }));

  return {
    items,
    meta: {
      total: count || items.length,
      page: params?.page || 1,
      pageSize: params?.pageSize || 50,
      totalPages: count && params?.pageSize ? Math.ceil(count / params.pageSize) : 1,
    },
  };
}

export async function fetchAlert(id: string): Promise<AlertItem> {
  const { data: d, error } = await supabase
    .from('alerts')
    .select('*, facilities(name, code)')
    .eq('id', id)
    .single();

  if (error || !d) {
    throw new Error(error?.message || 'Alert not found');
  }

  return {
    id: d.id,
    facilityId: d.facility_id,
    facilityName: d.facilities?.name || 'Unknown Facility',
    facilityCode: d.facilities?.code,
    drugId: d.drug_id,
    drugName: d.drug_name,
    severity: d.severity,
    type: d.type,
    message: d.message,
    status: d.status,
    smsDelivered: d.sms_delivered,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    resolvedAt: d.resolved_at,
  };
}

export async function updateAlertStatus(id: string, input: UpdateAlertStatusInput) {
  const updates: any = {
    status: input.status,
    updated_at: new Date().toISOString(),
  };

  if (input.status === 'RESOLVED') {
    updates.resolved_at = new Date().toISOString();
  }

  const { data: d, error } = await supabase
    .from('alerts')
    .update(updates)
    .eq('id', id)
    .select('*, facilities(name, code)')
    .single();

  if (error || !d) {
    throw new Error(error?.message || 'Failed to update alert');
  }

  return {
    id: d.id,
    facilityId: d.facility_id,
    facilityName: d.facilities?.name || 'Unknown Facility',
    facilityCode: d.facilities?.code,
    drugId: d.drug_id,
    drugName: d.drug_name,
    severity: d.severity,
    type: d.type,
    message: d.message,
    status: d.status,
    smsDelivered: d.sms_delivered,
    createdAt: d.created_at,
    updatedAt: d.updated_at,
    resolvedAt: d.resolved_at,
  } as AlertItem;
}
