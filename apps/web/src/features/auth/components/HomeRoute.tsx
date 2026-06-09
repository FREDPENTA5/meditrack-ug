import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/authStore';
import LandingPage from '../../../pages/LandingPage';

export function HomeRoute() {
  const isBootstrapped = useAuthStore((state) => state.isBootstrapped);
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!isBootstrapped) {
    return null;
  }

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LandingPage />;
}
