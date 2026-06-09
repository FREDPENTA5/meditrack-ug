import { useEffect } from 'react';
import axios from 'axios';
import type { ApiResponse, LoginResponse } from '@meditrack/shared';
import { Spinner } from '../../../components/atoms/Spinner';
import { API_BASE_URL } from '../../../lib/apiBase';
import { useAuthStore } from '../../../stores/authStore';

interface AuthBootstrapProps {
  children: React.ReactNode;
}

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const isBootstrapped = useAuthStore((state) => state.isBootstrapped);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setBootstrapped = useAuthStore((state) => state.setBootstrapped);

  useEffect(() => {
    async function bootstrap() {
      try {
        const response = await axios.post<ApiResponse<LoginResponse>>(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        if (response.data.success && response.data.data) {
          setAuth(response.data.data.user, response.data.data.accessToken);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setBootstrapped(true);
      }
    }

    bootstrap();
  }, [setAuth, clearAuth, setBootstrapped]);

  if (!isBootstrapped) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner size="lg" label="Loading MediTrack" />
      </div>
    );
  }

  return children;
}
