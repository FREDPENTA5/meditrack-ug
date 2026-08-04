import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<'CRITICAL' | 'WARNING'>('CRITICAL');

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

  const criticalAlerts = alerts?.filter((a) => a.severity === 'CRITICAL') ?? [];
  const warningAlerts = alerts?.filter((a) => a.severity === 'WARNING') ?? [];

  const displayAlerts = activeTab === 'CRITICAL' ? criticalAlerts : warningAlerts;

  return (
    <div
      className={cn(
        'flex flex-col bg-white overflow-hidden',
        !embedded && 'rounded-2xl border border-neutral-200',
      )}
      aria-live="polite"
    >
      <div className="flex border-b border-border/60">
        <button
          onClick={() => setActiveTab('CRITICAL')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3.5 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2',
            activeTab === 'CRITICAL'
              ? 'border-danger-500 text-danger-700 bg-danger-50/40'
              : 'border-transparent text-muted-foreground hover:bg-neutral-50 hover:text-foreground',
          )}
        >
          Critical
          <Badge
            variant={activeTab === 'CRITICAL' ? 'destructive' : 'secondary'}
            className="px-1.5 py-0 min-w-[20px] justify-center"
          >
            {criticalAlerts.length}
          </Badge>
        </button>
        <button
          onClick={() => setActiveTab('WARNING')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-3.5 text-[12px] font-bold uppercase tracking-wider transition-colors border-b-2 border-l border-l-border/60',
            activeTab === 'WARNING'
              ? 'border-warning-500 text-warning-700 bg-warning-50/40'
              : 'border-transparent text-muted-foreground hover:bg-neutral-50 hover:text-foreground',
          )}
        >
          Warning
          <Badge
            variant={activeTab === 'WARNING' ? 'warning' : 'secondary'}
            className="px-1.5 py-0 min-w-[20px] justify-center"
          >
            {warningAlerts.length}
          </Badge>
        </button>
      </div>

      <ul className="divide-y divide-border/60 max-h-[400px] overflow-y-auto">
        {displayAlerts.length > 0 ? (
          displayAlerts.map((alert) => (
            <li key={alert.id}>
              <button
                type="button"
                onClick={() => navigate(`/alerts/${alert.id}`)}
                className="group flex w-full items-center px-4 py-3 text-left transition-colors hover:bg-muted/40 sm:px-5"
              >
                <AlertIcon severity={alert.severity} />
                <div className="min-w-0 flex-1 ml-4 grid grid-cols-1 sm:grid-cols-[1.5fr_1fr_auto] gap-1 sm:gap-4 items-center">
                  <p className="truncate text-[13px] font-semibold text-foreground">
                    {alert.drugName}
                  </p>
                  <p className="truncate text-[12px] font-medium text-muted-foreground sm:text-left">
                    {alert.facilityName}
                  </p>
                  <p className="truncate text-[11px] font-medium text-muted-foreground sm:text-right hidden sm:block">
                    {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                  </p>
                </div>
                <ChevronRight
                  className="ml-3 h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-muted-foreground"
                  aria-hidden="true"
                />
              </button>
            </li>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <p className="text-[13px] font-medium">No {activeTab.toLowerCase()} alerts active.</p>
          </div>
        )}
      </ul>
    </div>
  );
}
