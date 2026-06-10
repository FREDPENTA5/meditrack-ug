import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { fetchDashboardSummary, fetchDashboardMap, fetchRecentAlerts } from '../api';

export function useDashboardSummary() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: fetchDashboardSummary,
    enabled: isAuthenticated,
  });
}

export function useDashboardMap() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return useQuery({
    queryKey: ['dashboard', 'map'],
    queryFn: fetchDashboardMap,
    enabled: isAuthenticated,
  });
}

export function useRecentAlerts(limit = 10) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

  return useQuery({
    queryKey: ['dashboard', 'alerts', limit],
    queryFn: () => fetchRecentAlerts(limit),
    enabled: isAuthenticated,
  });
}
