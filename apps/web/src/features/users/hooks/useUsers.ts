import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, setUserActive } from '../api';

export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
}

export function useSetUserActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      setUserActive(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
}
