import { useEffect } from 'react';
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
        <div className="flex flex-col items-center animate-pulse">
          <img
            src="/logo.png"
            alt="MediTrack Loading..."
            className="h-16 w-auto object-contain opacity-70"
          />
        </div>
      </div>
    );
  }

  return children;
}
