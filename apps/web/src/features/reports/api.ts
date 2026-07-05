import type { ReportSummary, ApiResponse } from '@meditrack/shared';
import { api } from '@/lib/api';

export async function fetchReportSummary(): Promise<ReportSummary> {
  const res = await api.get<ApiResponse<ReportSummary>>('/reports/summary');

  if (!res.data.success || !res.data.data) {
    throw new Error(res.data.error?.message ?? 'Failed to fetch report summary');
  }

  return res.data.data;
}
