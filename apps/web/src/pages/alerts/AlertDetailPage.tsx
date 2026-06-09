import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/molecules/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAlert, useUpdateAlertStatus } from '@/features/alerts/hooks/useAlerts';

export default function AlertDetailPage() {
  const { id = '' } = useParams();
  const alert = useAlert(id);
  const updateStatus = useUpdateAlertStatus();

  if (alert.isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  if (!alert.data) {
    return (
      <div className="space-y-4">
        <Link
          to="/alerts"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to alerts
        </Link>
        <p>Alert not found.</p>
      </div>
    );
  }

  const data = alert.data;
  const canAct = data.status === 'ACTIVE' || data.status === 'ACKNOWLEDGED';

  return (
    <div className="space-y-8">
      <Link
        to="/alerts"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to alerts
      </Link>

      <PageHeader
        title={data.drugName}
        description={`${data.facilityName} — ${data.type.replace(/_/g, ' ').toLowerCase()}`}
        action={
          canAct ? (
            <div className="flex gap-2">
              {data.status === 'ACTIVE' && (
                <Button
                  variant="outline"
                  loading={updateStatus.isPending}
                  onClick={() => updateStatus.mutate({ id, input: { status: 'ACKNOWLEDGED' } })}
                >
                  Acknowledge
                </Button>
              )}
              <Button
                loading={updateStatus.isPending}
                onClick={() => updateStatus.mutate({ id, input: { status: 'RESOLVED' } })}
              >
                Resolve
              </Button>
            </div>
          ) : undefined
        }
      />

      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Badge variant={data.severity === 'CRITICAL' ? 'destructive' : 'warning'}>
              {data.severity}
            </Badge>
            <Badge variant="outline">{data.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Message
            </p>
            <p className="mt-1 text-sm">{data.message}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Created
              </p>
              <p className="mt-1 text-sm">{format(new Date(data.createdAt), 'PPpp')}</p>
            </div>
            {data.resolvedAt && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Resolved
                </p>
                <p className="mt-1 text-sm">{format(new Date(data.resolvedAt), 'PPpp')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
