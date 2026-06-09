import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UpdateAlertStatusInput } from '@meditrack/shared';
import { fetchAlert, fetchAlerts, updateAlertStatus } from '../api';

export function useAlerts(params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  severity?: string;
}) {
  return useQuery({
    queryKey: ['alerts', params],
    queryFn: () => fetchAlerts(params),
  });
}

export function useAlert(id: string) {
  return useQuery({
    queryKey: ['alerts', id],
    queryFn: () => fetchAlert(id),
    enabled: Boolean(id),
  });
}

export function useUpdateAlertStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAlertStatusInput }) =>
      updateAlertStatus(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'alerts'] });
    },
  });
}
