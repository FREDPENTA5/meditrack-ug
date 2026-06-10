type StockStatus = 'ADEQUATE' | 'LOW' | 'CRITICAL' | 'STOCKOUT';

const STATUS_RANK: Record<StockStatus, number> = {
  STOCKOUT: 0,
  CRITICAL: 1,
  LOW: 2,
  ADEQUATE: 3,
};

export function worstStatus(statuses: StockStatus[]): StockStatus {
  if (!statuses.length) return 'ADEQUATE';

  return statuses.reduce((worst, status) =>
    STATUS_RANK[status] < STATUS_RANK[worst] ? status : worst,
  );
}

export function summarizeStatuses(statuses: StockStatus[]) {
  return {
    adequate: statuses.filter((s) => s === 'ADEQUATE').length,
    low: statuses.filter((s) => s === 'LOW').length,
    critical: statuses.filter((s) => s === 'CRITICAL').length,
    stockout: statuses.filter((s) => s === 'STOCKOUT').length,
  };
}
