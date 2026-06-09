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
import PlaceholderPage from './pages/PlaceholderPage';

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
          <Route
            path="/facilities"
            element={
              <PlaceholderPage
                title="Facilities"
                description="Monitor all registered health facilities in your district or nationally."
              />
            }
          />
          <Route
            path="/stock-entry"
            element={
              <PlaceholderPage
                title="Stock Entry"
                description="Log current drug quantities for your facility."
              />
            }
          />
          <Route
            path="/alerts"
            element={
              <PlaceholderPage
                title="Alerts"
                description="Active and historical stock alerts across your scope."
              />
            }
          />
          <Route
            path="/reports"
            element={
              <PlaceholderPage
                title="Reports"
                description="Generate stock history and alert summary reports."
              />
            }
          />
          <Route
            path="/users"
            element={
              <PlaceholderPage
                title="User Management"
                description="Manage facility workers, district officers, and administrators."
              />
            }
          />
          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="Settings"
                description="Profile and notification preferences."
              />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthBootstrap>
  );
}

export default App;
