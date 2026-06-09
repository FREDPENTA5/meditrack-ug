import { Badge } from '@/components/ui/badge';
import type { StockStatus } from '@meditrack/shared';

const labels: Record<StockStatus, string> = {
  ADEQUATE: 'Adequate',
  LOW: 'Low',
  CRITICAL: 'Critical',
  STOCKOUT: 'Stock-out',
};

const variants: Record<StockStatus, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  ADEQUATE: 'success',
  LOW: 'warning',
  CRITICAL: 'destructive',
  STOCKOUT: 'destructive',
};

export function StatusBadge({ status }: { status: StockStatus | string }) {
  const key = status as StockStatus;
  return <Badge variant={variants[key] ?? 'secondary'}>{labels[key] ?? status}</Badge>;
}
