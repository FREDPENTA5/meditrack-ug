import { useQuery } from '@tanstack/react-query';
import { fetchDashboardSummary, fetchDashboardMap, fetchRecentAlerts } from '../api';

export function useDashboardSummary() {
  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: fetchDashboardSummary,
  });
}

export function useDashboardMap() {
  return useQuery({
    queryKey: ['dashboard', 'map'],
    queryFn: fetchDashboardMap,
  });
}

export function useRecentAlerts(limit = 10) {
  return useQuery({
    queryKey: ['dashboard', 'alerts', limit],
    queryFn: () => fetchRecentAlerts(limit),
  });
}
