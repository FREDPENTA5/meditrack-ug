import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../../organisms/Sidebar';
import { TopBar } from '../../organisms/TopBar';
import { useDashboardSummary } from '../../../features/dashboard/hooks/useDashboard';

export function DashboardLayout() {
  const { data: summary } = useDashboardSummary();
  const alertCount = summary?.unresolvedAlerts ?? 0;
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar variant="mobile" alertCount={alertCount} />

      <div className="flex min-h-screen">
        <Sidebar variant="desktop" alertCount={alertCount} />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar alertCount={alertCount} />
          <main className="flex-1 bg-muted/30 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
