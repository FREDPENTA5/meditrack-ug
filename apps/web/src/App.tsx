import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './components/templates/AuthLayout';
import { DashboardLayout } from './components/templates/DashboardLayout';
import { AuthBootstrap } from './features/auth/components/AuthBootstrap';
import { GuestRoute } from './features/auth/components/GuestRoute';
import { HomeRoute } from './features/auth/components/HomeRoute';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';

// Lazy load pages for code splitting to reduce initial bundle size
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const StockEntryPage = lazy(() => import('./pages/stock/StockEntryPage'));
const AlertsPage = lazy(() => import('./pages/alerts/AlertsPage'));
const AlertDetailPage = lazy(() => import('./pages/alerts/AlertDetailPage'));
const FacilitiesPage = lazy(() => import('./pages/facilities/FacilitiesPage'));
const FacilityDetailPage = lazy(() => import('./pages/facilities/FacilityDetailPage'));
const ReportsPage = lazy(() => import('./pages/reports/ReportsPage'));
const UsersPage = lazy(() => import('./pages/users/UsersPage'));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));

// A simple loading fallback for lazy-loaded routes
const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
  </div>
);

function App() {
  return (
    <AuthBootstrap>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomeRoute />} />

          <Route
            path="/auth"
            element={
              <GuestRoute>
                <AuthLayout />
              </GuestRoute>
            }
          >
            <Route index element={<Navigate to="/auth/login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/facilities/:id" element={<FacilityDetailPage />} />
            <Route path="/stock-entry" element={<StockEntryPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/alerts/:id" element={<AlertDetailPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthBootstrap>
  );
}

export default App;
