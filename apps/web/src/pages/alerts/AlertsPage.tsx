import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardSection } from '@/components/molecules/DashboardSection';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAlerts } from '@/features/alerts/hooks/useAlerts';

function severityVariant(severity: string) {
  if (severity === 'CRITICAL') return 'destructive' as const;
  if (severity === 'WARNING') return 'warning' as const;
  return 'secondary' as const;
}

export default function AlertsPage() {
  const [status, setStatus] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');

  const alerts = useAlerts({
    page: 1,
    pageSize: 50,
    status: status || undefined,
    severity: severity || undefined,
  });

  return (
    <div className="space-y-8">
      <PageHeader title="Alerts" description="Active and historical stock alerts in your scope" />

      <DashboardSection eyebrow="Filters" title="All alerts">
        <div className="flex flex-wrap gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="ACKNOWLEDGED">Acknowledged</option>
            <option value="RESOLVED">Resolved</option>
          </select>
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="WARNING">Warning</option>
            <option value="INFO">Info</option>
          </select>
        </div>

        <Card className="mt-4 shadow-sm">
          <CardContent className="p-0">
            {alerts.isLoading ? (
              <div className="space-y-2 p-4">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            ) : !alerts.data?.items.length ? (
              <div className="p-6">
                <EmptyState title="No alerts match your filters" />
              </div>
            ) : (
              <ul className="divide-y divide-border/60">
                {alerts.data.items.map((alert) => (
                  <li key={alert.id}>
                    <Link
                      to={`/alerts/${alert.id}`}
                      className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/40"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium">{alert.drugName}</p>
                          <Badge variant={severityVariant(alert.severity)}>{alert.severity}</Badge>
                          <Badge variant="outline">{alert.status}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {alert.facilityName} ·{' '}
                          {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                        </p>
                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                          {alert.message}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <span>View</span>
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </DashboardSection>
    </div>
  );
}
