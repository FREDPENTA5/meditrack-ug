import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);

  if (!accessToken || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}
