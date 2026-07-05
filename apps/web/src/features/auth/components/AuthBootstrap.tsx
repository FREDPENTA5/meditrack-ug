import { useEffect } from 'react';
import { Spinner } from '../../../components/atoms/Spinner';
import { refreshSessionRequest } from '../api';
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
    let active = true;

    async function restoreSession() {
      try {
        const { user, accessToken } = await refreshSessionRequest();
        if (active) setAuth(user, accessToken);
      } catch {
        if (active) clearAuth();
      } finally {
        if (active) setBootstrapped(true);
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
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
