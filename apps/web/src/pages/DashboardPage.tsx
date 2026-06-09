import { Building2, AlertTriangle, Package, CheckCircle2 } from 'lucide-react';
import { StatTile } from '@/components/molecules/StatTile';
import { PageHeader } from '@/components/molecules/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FacilityMap } from '@/components/organisms/FacilityMap';
import { AlertFeed } from '@/components/organisms/AlertFeed';
import { useAuthStore } from '@/stores/authStore';
import {
  useDashboardSummary,
  useDashboardMap,
  useRecentAlerts,
} from '@/features/dashboard/hooks/useDashboard';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const isFacilityWorker = user?.role === 'FACILITY_WORKER';

  const summary = useDashboardSummary();
  const map = useDashboardMap();
  const alerts = useRecentAlerts(8);

  if (isFacilityWorker) {
    const { data } = summary;

    return (
      <div className="space-y-6">
        <PageHeader title="My Facility" description="Gayaza Hospital — live stock overview" />

        <div className="grid gap-4 sm:grid-cols-3">
          {summary.isLoading ? (
            <>
              <Skeleton className="h-[120px] rounded-xl" />
              <Skeleton className="h-[120px] rounded-xl" />
              <Skeleton className="h-[120px] rounded-xl" />
            </>
          ) : (
            <>
              <StatTile
                label="Drugs OK"
                value={data?.drugsOk ?? 0}
                icon={CheckCircle2}
                variant="adequate"
              />
              <StatTile
                label="Drugs Low"
                value={data?.drugsLow ?? 0}
                icon={Package}
                variant="low"
              />
              <StatTile
                label="Drugs at Zero"
                value={data?.drugsAtZero ?? 0}
                icon={AlertTriangle}
                variant="critical"
              />
            </>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <AlertFeed alerts={alerts.data} isLoading={alerts.isLoading} />
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data } = summary;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="System-wide overview — facilities, stock-outs, and active alerts"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))
        ) : (
          <>
            <StatTile
              label="Total Facilities"
              value={data?.totalFacilities ?? 0}
              icon={Building2}
            />
            <StatTile
              label="Stock-outs Today"
              value={data?.stockoutsToday ?? 0}
              icon={AlertTriangle}
              variant="critical"
            />
            <StatTile
              label="Low Stock Drugs"
              value={data?.lowStockDrugs ?? 0}
              icon={Package}
              variant="low"
            />
            <StatTile
              label="Unresolved Alerts"
              value={data?.unresolvedAlerts ?? 0}
              icon={AlertTriangle}
              variant="low"
            />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Facility Map</CardTitle>
          </CardHeader>
          <CardContent>
            <FacilityMap data={map.data} isLoading={map.isLoading} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Alert Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <AlertFeed alerts={alerts.data} isLoading={alerts.isLoading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
