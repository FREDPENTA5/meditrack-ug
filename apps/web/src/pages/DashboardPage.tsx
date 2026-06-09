import { Building2, AlertTriangle, Package, CheckCircle2 } from 'lucide-react';
import { StatTile } from '@/components/molecules/StatTile';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardSection } from '@/components/molecules/DashboardSection';
import { KpiGrid } from '@/components/molecules/KpiGrid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { FacilityMap } from '@/components/organisms/FacilityMap';
import { AlertFeed } from '@/components/organisms/AlertFeed';
import { useAuthStore } from '@/stores/authStore';
import {
  useDashboardSummary,
  useDashboardMap,
  useRecentAlerts,
} from '@/features/dashboard/hooks/useDashboard';

function KpiSkeleton({ count }: { count: number }) {
  return (
    <KpiGrid columns={count === 4 ? 4 : 3}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={`kpi-skeleton-${i}`} className="space-y-3 px-5 py-4 sm:px-6 sm:py-5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-14" />
        </div>
      ))}
    </KpiGrid>
  );
}

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const isFacilityWorker = user?.role === 'FACILITY_WORKER';

  const summary = useDashboardSummary();
  const map = useDashboardMap();
  const alerts = useRecentAlerts(8);

  if (isFacilityWorker) {
    const { data } = summary;

    return (
      <div className="space-y-8">
        <PageHeader title="My Facility" description="Gayaza Hospital — live stock overview" />

        <DashboardSection
          eyebrow="Overview"
          title="Stock status"
          description="Counts across your facility formulary"
        >
          {summary.isLoading ? (
            <KpiSkeleton count={3} />
          ) : (
            <KpiGrid>
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
                emphasize={(data?.drugsLow ?? 0) > 0}
              />
              <StatTile
                label="Drugs at Zero"
                value={data?.drugsAtZero ?? 0}
                icon={AlertTriangle}
                variant="critical"
                emphasize
              />
            </KpiGrid>
          )}
        </DashboardSection>

        <DashboardSection
          eyebrow="Activity"
          title="Recent alerts"
          description="Stock events that need attention"
        >
          <Card className="shadow-sm">
            <CardHeader className="border-b border-border/60 pb-4">
              <CardTitle className="text-base font-medium">Latest</CardTitle>
              <CardDescription>Tap an alert for full details</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <AlertFeed alerts={alerts.data} isLoading={alerts.isLoading} embedded />
            </CardContent>
          </Card>
        </DashboardSection>
      </div>
    );
  }

  const { data } = summary;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="System-wide overview — facilities, stock-outs, and active alerts"
      />

      <DashboardSection
        eyebrow="Overview"
        title="Key metrics"
        description="Snapshot across Wakiso district"
      >
        {summary.isLoading ? (
          <KpiSkeleton count={4} />
        ) : (
          <KpiGrid columns={4}>
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
              emphasize={(data?.stockoutsToday ?? 0) > 0}
            />
            <StatTile
              label="Low Stock Drugs"
              value={data?.lowStockDrugs ?? 0}
              icon={Package}
              variant="low"
              emphasize={(data?.lowStockDrugs ?? 0) > 0}
            />
            <StatTile
              label="Unresolved Alerts"
              value={data?.unresolvedAlerts ?? 0}
              icon={AlertTriangle}
              variant="low"
              emphasize={(data?.unresolvedAlerts ?? 0) > 0}
            />
          </KpiGrid>
        )}
      </DashboardSection>

      <div className="grid gap-6 lg:grid-cols-5">
        <DashboardSection
          className="lg:col-span-3"
          eyebrow="Geography"
          title="Facility map"
          description="Stock health by location"
        >
          <Card className="shadow-sm">
            <CardContent className="p-4 sm:p-5">
              <FacilityMap data={map.data} isLoading={map.isLoading} />
            </CardContent>
          </Card>
        </DashboardSection>

        <DashboardSection
          className="lg:col-span-2"
          eyebrow="Activity"
          title="Alert feed"
          description="Most recent across your scope"
        >
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <AlertFeed alerts={alerts.data} isLoading={alerts.isLoading} embedded />
            </CardContent>
          </Card>
        </DashboardSection>
      </div>
    </div>
  );
}
