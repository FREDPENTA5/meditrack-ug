import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './components/templates/AuthLayout';
import { DashboardLayout } from './components/templates/DashboardLayout';
import { AuthBootstrap } from './features/auth/components/AuthBootstrap';
import { GuestRoute } from './features/auth/components/GuestRoute';
import { HomeRoute } from './features/auth/components/HomeRoute';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { Skeleton } from './components/ui/skeleton';

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

// A skeleton loading fallback for lazy-loaded routes
const PageLoader = () => (
  <div className="flex h-screen bg-background">
    <div className="flex-1 flex flex-col min-w-0">
      <div className="flex-1 p-6 sm:p-8 overflow-hidden space-y-8 animate-in fade-in duration-500">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-[120px]" />
            <Skeleton className="h-9 w-[120px]" />
          </div>
          <div className="rounded-xl border border-border/60 shadow-sm bg-card overflow-hidden">
            <div className="p-4 border-b border-border/60">
              <div className="flex gap-4">
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-5 flex-1" />
              </div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 border-b border-border/60 last:border-0">
                <div className="flex gap-4">
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 flex-1" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
