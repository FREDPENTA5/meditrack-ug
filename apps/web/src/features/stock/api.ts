import type { BatchStockEntryInput, ApiResponse } from '@meditrack/shared';
import { api } from '@/lib/api';

export interface StockRow {
  id: string;
  facilityId: string;
  drugId: string;
  drugName: string;
  category: string;
  quantity: number;
  unit: string;
  status: string;
  daysRemaining: number | null;
  entryDate: string;
  reportedBy: string;
}

export async function fetchFacilityStock(facilityId: string): Promise<StockRow[]> {
  const res = await api.get<ApiResponse<StockRow[]>>(`/stock/${facilityId}/latest`);
  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to load stock');
  }
  return res.data.data;
}

export async function submitStockEntry(payload: BatchStockEntryInput): Promise<boolean> {
  const res = await api.post<ApiResponse<any>>('/stock/entry', payload);
  if (!res.data.success) {
    throw new Error(res.data.error?.message ?? 'Failed to submit stock');
  }
  return true;
}
