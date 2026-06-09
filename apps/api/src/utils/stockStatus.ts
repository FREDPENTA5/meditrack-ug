import type { StockStatus } from '@meditrack/shared';

interface ThresholdInput {
  lowDays: number;
  criticalDays: number;
  avgDailyUsage: number;
}

export function calculateStockStatus(
  quantity: number,
  threshold: ThresholdInput,
): { status: StockStatus; daysRemaining: number | null } {
  if (quantity === 0) {
    return { status: 'STOCKOUT', daysRemaining: 0 };
  }

  if (threshold.avgDailyUsage <= 0) {
    return { status: 'ADEQUATE', daysRemaining: null };
  }

  const daysRemaining = quantity / threshold.avgDailyUsage;

  if (daysRemaining > threshold.lowDays) {
    return { status: 'ADEQUATE', daysRemaining };
  }

  if (daysRemaining > threshold.criticalDays) {
    return { status: 'LOW', daysRemaining };
  }

  return { status: 'CRITICAL', daysRemaining };
}

export function worstStatus(statuses: StockStatus[]): StockStatus {
  const priority: StockStatus[] = ['STOCKOUT', 'CRITICAL', 'LOW', 'ADEQUATE'];
  for (const status of priority) {
    if (statuses.includes(status)) return status;
  }
  return 'ADEQUATE';
}
