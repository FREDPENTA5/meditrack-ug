import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import type { LoginInput } from '@meditrack/shared';
import { loginRequest } from '../api';
import { useAuthStore } from '../../../stores/authStore';

function getLoginErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Login failed';
}

export function useLogin() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (input: LoginInput) => loginRequest(input),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      navigate('/dashboard', { replace: true });
    },
    meta: { getErrorMessage: getLoginErrorMessage },
  });
}

export function useLoginErrorMessage(error: unknown): string | undefined {
  if (!error) return undefined;
  return getLoginErrorMessage(error);
}
