import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './components/templates/AuthLayout';
import { DashboardLayout } from './components/templates/DashboardLayout';
import { AuthBootstrap } from './features/auth/components/AuthBootstrap';
import { GuestRoute } from './features/auth/components/GuestRoute';
import { HomeRoute } from './features/auth/components/HomeRoute';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import StockEntryPage from './pages/stock/StockEntryPage';
import AlertsPage from './pages/alerts/AlertsPage';
import AlertDetailPage from './pages/alerts/AlertDetailPage';
import FacilitiesPage from './pages/facilities/FacilitiesPage';
import FacilityDetailPage from './pages/facilities/FacilityDetailPage';
import ReportsPage from './pages/reports/ReportsPage';
import UsersPage from './pages/users/UsersPage';
import SettingsPage from './pages/settings/SettingsPage';

function App() {
  return (
    <AuthBootstrap>
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
    </AuthBootstrap>
  );
}

export default App;
