import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, setUserActive, createUser } from '../api';

export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: import('@meditrack/shared').RegisterInput) => createUser(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useSetUserActive() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      setUserActive(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
}
