import type { UpdateAlertStatusInput } from '@meditrack/shared';
import { api } from '@/lib/api';

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
  const query: Record<string, string | number> = {};
  if (params?.page) query.page = params.page;
  if (params?.pageSize) query.pageSize = params.pageSize;
  if (params?.status) query.status = params.status;
  if (params?.severity) query.severity = params.severity;

  const { data: resp } = await api.get('/alerts', { params: query });

  if (!resp.success) {
    throw new Error(resp.error?.message || 'Failed to load alerts');
  }

  const items: AlertItem[] = (resp.data || []).map((d: any) => ({
    id: d.id,
    facilityId: d.facilityId,
    facilityName: d.facilityName || 'Unknown Facility',
    facilityCode: d.facilityCode,
    drugId: d.drugId,
    drugName: d.drugName,
    severity: d.severity,
    type: d.type,
    message: d.message,
    status: d.status,
    smsDelivered: d.smsDelivered,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    resolvedAt: d.resolvedAt,
  }));

  return {
    items,
    meta: resp.meta || {
      total: items.length,
      page: params?.page || 1,
      pageSize: params?.pageSize || 50,
      totalPages: 1,
    },
  };
}

export async function fetchAlert(id: string): Promise<AlertItem> {
  const { data: resp } = await api.get(`/alerts/${id}`);

  if (!resp.success || !resp.data) {
    throw new Error(resp.error?.message || 'Alert not found');
  }

  const d = resp.data;
  return {
    id: d.id,
    facilityId: d.facilityId,
    facilityName: d.facilityName || 'Unknown Facility',
    facilityCode: d.facilityCode,
    drugId: d.drugId,
    drugName: d.drugName,
    severity: d.severity,
    type: d.type,
    message: d.message,
    status: d.status,
    smsDelivered: d.smsDelivered,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    resolvedAt: d.resolvedAt,
  };
}

export async function updateAlertStatus(id: string, input: UpdateAlertStatusInput) {
  const { data: resp } = await api.patch(`/alerts/${id}/status`, input);

  if (!resp.success || !resp.data) {
    throw new Error(resp.error?.message || 'Failed to update alert');
  }

  const d = resp.data;
  return {
    id: d.id,
    facilityId: d.facilityId,
    facilityName: d.facilityName || 'Unknown Facility',
    facilityCode: d.facilityCode,
    drugId: d.drugId,
    drugName: d.drugName,
    severity: d.severity,
    type: d.type,
    message: d.message,
    status: d.status,
    smsDelivered: d.smsDelivered,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    resolvedAt: d.resolvedAt,
  } as AlertItem;
}
