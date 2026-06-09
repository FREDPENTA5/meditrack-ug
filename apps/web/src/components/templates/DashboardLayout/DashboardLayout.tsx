import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../organisms/Sidebar';
import { TopBar } from '../../organisms/TopBar';
import { useDashboardSummary } from '../../../features/dashboard/hooks/useDashboard';

export function DashboardLayout() {
  const { data: summary } = useDashboardSummary();
  const alertCount = summary?.unresolvedAlerts ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar variant="mobile" alertCount={alertCount} />

      <div className="flex min-h-screen">
        <Sidebar variant="desktop" alertCount={alertCount} />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar alertCount={alertCount} />
          <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
            <div className="mx-auto max-w-content">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
