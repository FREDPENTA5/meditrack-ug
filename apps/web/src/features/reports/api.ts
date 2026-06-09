import type { ApiResponse, ReportSummary } from '@meditrack/shared';
import { api } from '@/lib/api';

export async function fetchReportSummary(): Promise<ReportSummary> {
  const response = await api.get<ApiResponse<ReportSummary>>('/reports/summary');
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? 'Failed to load report');
  }
  return response.data.data;
}
