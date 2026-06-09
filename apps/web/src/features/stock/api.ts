import type { ApiResponse, BatchStockEntryInput } from '@meditrack/shared';
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
  const response = await api.get<ApiResponse<StockRow[]>>(`/stock/${facilityId}/latest`);
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load stock');
  }
  return response.data.data;
}

export async function submitStockEntry(payload: BatchStockEntryInput) {
  const response = await api.post<ApiResponse<unknown>>('/stock/entry', payload);
  if (!response.data.success) {
    throw new Error(response.data.error?.message ?? 'Failed to submit stock');
  }
  return response.data.data;
}
