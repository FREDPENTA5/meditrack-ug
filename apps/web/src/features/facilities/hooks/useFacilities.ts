import { useQuery } from '@tanstack/react-query';
import { fetchFacilities, fetchFacility, fetchFacilityStock } from '../api';

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
