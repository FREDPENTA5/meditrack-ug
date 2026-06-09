import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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

export function AlertFeed({ alerts, isLoading, embedded = false }: AlertFeedProps) {
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
      className={cn('divide-y divide-border/60', !embedded && 'rounded-lg border')}
      aria-live="polite"
    >
      {alerts.map((alert) => (
        <li key={alert.id}>
          <Link
            to={`/alerts/${alert.id}`}
            className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40 sm:px-5"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-foreground">{alert.drugName}</p>
                <Badge
                  variant={severityToBadge(alert.severity)}
                  className="hidden shrink-0 sm:inline-flex"
                >
                  {alert.severity}
                </Badge>
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {alert.facilityName}
                <span className="mx-1.5 text-border">·</span>
                {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
              </p>
            </div>
            <ChevronRight
              className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
