import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { BatchStockEntryInput } from '@meditrack/shared';
import { fetchFacilityStock, submitStockEntry } from '../api';

export function useFacilityStock(facilityId?: string) {
  return useQuery({
    queryKey: ['stock', facilityId],
    queryFn: () => fetchFacilityStock(facilityId!),
    enabled: Boolean(facilityId),
  });
}

export function useSubmitStock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BatchStockEntryInput) => submitStockEntry(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['stock', variables.facilityId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'alerts'] });
    },
  });
}
