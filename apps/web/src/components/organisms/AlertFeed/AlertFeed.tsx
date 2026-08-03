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

  const criticalAlerts = alerts.filter((a) => a.severity === 'CRITICAL');
  const warningAlerts = alerts.filter((a) => a.severity === 'WARNING');
  const otherAlerts = alerts.filter((a) => a.severity !== 'CRITICAL' && a.severity !== 'WARNING');

  const renderCategory = (
    title: string,
    categoryAlerts: DashboardAlert[],
    titleClass: string,
    borderClass: string,
  ) => {
    if (!categoryAlerts.length) return null;
    return (
      <div
        className={cn('flex flex-col rounded-[14px] border overflow-hidden shadow-xs', borderClass)}
      >
        <div
          className={cn(
            'sticky top-0 z-10 px-5 py-3 text-[12px] font-bold uppercase tracking-wider border-b',
            titleClass,
            borderClass,
          )}
        >
          {title} ({categoryAlerts.length})
        </div>
        <ul className="divide-y divide-neutral-100 max-h-[300px] overflow-y-auto bg-white">
          {categoryAlerts.map((alert) => (
            <li key={alert.id}>
              <button
                type="button"
                onClick={() => navigate(`/alerts/${alert.id}`)}
                className="group flex w-full items-center px-4 py-3 text-left transition-colors hover:bg-muted/40 sm:px-5"
              >
                <AlertIcon severity={alert.severity} />
                <div className="min-w-0 flex-1 ml-4 grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 items-center">
                  <p className="truncate text-[13px] font-semibold text-foreground">
                    {alert.drugName}
                  </p>
                  <p className="truncate text-[12px] font-medium text-muted-foreground sm:text-right">
                    {alert.facilityName}
                    <span className="mx-1.5 text-border hidden sm:inline-block">·</span>
                    <span className="text-[11px]">
                      {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                    </span>
                  </p>
                </div>
                <ChevronRight
                  className="ml-3 h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 gap-6',
        !embedded
          ? 'rounded-2xl border border-neutral-200 p-4 sm:p-6 bg-white shadow-sm'
          : 'p-4 sm:p-6 bg-white rounded-2xl',
      )}
      aria-live="polite"
    >
      {renderCategory(
        'Critical Alerts',
        criticalAlerts,
        'text-danger-700 bg-danger-50/50',
        'border-danger-100',
      )}
      {renderCategory(
        'Warning Alerts',
        warningAlerts,
        'text-warning-700 bg-warning-50/50',
        'border-warning-100',
      )}
    </div>
  );
}
