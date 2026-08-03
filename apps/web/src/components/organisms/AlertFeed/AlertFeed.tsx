import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { DashboardAlert } from '@/features/dashboard/api';
import { cn } from '@/lib/cn';

interface AlertFeedProps {
  alerts?: DashboardAlert[];
  isLoading?: boolean;
  embedded?: boolean;
}

function severityToBadge(severity: DashboardAlert['severity']) {
  if (severity === 'CRITICAL') return 'destructive' as const;
  if (severity === 'WARNING') return 'warning' as const;
  return 'secondary' as const;
}

function AlertIcon({ severity }: { severity: DashboardAlert['severity'] }) {
  if (severity === 'CRITICAL') {
    return (
      <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-danger-50 text-danger-600">
        <AlertCircle className="h-[18px] w-[18px]" />
      </div>
    );
  }
  if (severity === 'WARNING') {
    return (
      <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-warning-50 text-warning-600">
        <AlertTriangle className="h-[18px] w-[18px]" />
      </div>
    );
  }
  return (
    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-info-50 text-info-600">
      <Info className="h-[18px] w-[18px]" />
    </div>
  );
}

export function AlertFeed({ alerts, isLoading, embedded = false }: AlertFeedProps) {
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className={cn('space-y-0', !embedded && 'space-y-3')} aria-live="polite">
        {embedded ? (
          <>
            <Skeleton className="h-16 w-full rounded-none" />
            <Skeleton className="h-16 w-full rounded-none" />
            <Skeleton className="h-16 w-full rounded-none" />
          </>
        ) : (
          <>
            <Skeleton className="h-[72px] w-full rounded-lg" />
            <Skeleton className="h-[72px] w-full rounded-lg" />
            <Skeleton className="h-[72px] w-full rounded-lg" />
          </>
        )}
      </div>
    );
  }

  if (!alerts?.length) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-12 text-center',
          embedded ? 'px-6' : 'rounded-lg border border-dashed',
        )}
      >
        <p className="text-sm font-medium text-foreground">No active alerts</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Stock levels look stable in your scope.
        </p>
      </div>
    );
  }

  return (
    <ul
      className={cn(
        'divide-y divide-border/60',
        embedded ? 'max-h-[400px] overflow-y-auto' : 'rounded-lg border',
      )}
      aria-live="polite"
    >
      {alerts.map((alert) => (
        <li key={alert.id}>
          <button
            type="button"
            onClick={() => navigate(`/alerts/${alert.id}`)}
            className="group flex w-full items-center px-4 py-3 text-left transition-colors hover:bg-muted/40 sm:px-5"
          >
            <AlertIcon severity={alert.severity} />
            <div className="min-w-0 flex-1 ml-3">
              <div className="flex items-center gap-2">
                <p className="truncate text-[13px] font-semibold text-foreground">
                  {alert.drugName}
                </p>
                <Badge
                  variant={severityToBadge(alert.severity)}
                  className="hidden shrink-0 sm:inline-flex"
                >
                  {alert.severity}
                </Badge>
              </div>
              <p className="mt-0.5 truncate text-[11px] font-medium text-muted-foreground">
                {alert.facilityName}
                <span className="mx-1.5 text-border">·</span>
                {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
              </p>
            </div>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground"
              aria-hidden="true"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
