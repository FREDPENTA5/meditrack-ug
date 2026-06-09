import { useQuery } from '@tanstack/react-query';
import { fetchReportSummary } from '../api';

export function useReportSummary() {
  return useQuery({ queryKey: ['reports', 'summary'], queryFn: fetchReportSummary });
}
