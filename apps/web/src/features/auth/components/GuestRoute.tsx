import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const isBootstrapped = useAuthStore((state) => state.isBootstrapped);
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!isBootstrapped) {
    return null;
  }

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
