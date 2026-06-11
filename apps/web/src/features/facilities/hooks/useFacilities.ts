import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchFacilities,
  fetchFacility,
  fetchFacilityStock,
  fetchDistricts,
  createFacility,
  setFacilityActive,
  type CreateFacilityInput,
} from '../api';

export function useFacilities() {
  return useQuery({ queryKey: ['facilities'], queryFn: fetchFacilities });
}

export function useFacility(id: string) {
  return useQuery({
    queryKey: ['facilities', id],
    queryFn: () => fetchFacility(id),
    enabled: Boolean(id),
  });
}

export function useFacilityStock(id: string) {
  return useQuery({
    queryKey: ['facilities', id, 'stock'],
    queryFn: () => fetchFacilityStock(id),
    enabled: Boolean(id),
  });
}

export function useDistricts() {
  return useQuery({ queryKey: ['districts'], queryFn: fetchDistricts });
}

export function useCreateFacility() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateFacilityInput) => createFacility(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facilities'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'summary'] });
    },
  });
}

export function useSetFacilityActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      setFacilityActive(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['facilities'] }),
  });
}
