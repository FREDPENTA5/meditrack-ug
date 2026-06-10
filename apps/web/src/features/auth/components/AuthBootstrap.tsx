import { useEffect } from 'react';
import { Spinner } from '../../../components/atoms/Spinner';
import { fetchAuthProfile } from '../../../lib/authUser';
import { supabase } from '../../../lib/supabase';
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
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!active) return;

        if (session?.user) {
          const profile = await fetchAuthProfile(session.user.id);
          setAuth(profile, session.access_token);
        } else {
          clearAuth();
        }
      } catch {
        if (active) clearAuth();
      } finally {
        if (active) setBootstrapped(true);
      }
    }

    restoreSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!active) return;

      if (event === 'SIGNED_OUT' || !session?.user) {
        clearAuth();
        return;
      }

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        try {
          const profile = await fetchAuthProfile(session.user.id);
          setAuth(profile, session.access_token);
        } catch {
          clearAuth();
        }
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
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
