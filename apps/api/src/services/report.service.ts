import type { StockStatus } from '@meditrack/shared';
import type { AccessTokenPayload } from '../utils/jwt';
import { getFacilityScope } from '../utils/scope';
import { dashboardRepository } from '../repositories/dashboard.repository';
import { alertRepository } from '../repositories/alert.repository';
import { drugRepository } from '../repositories/drug.repository';

export const reportService = {
  async getSummary(user: AccessTokenPayload) {
    const scope = getFacilityScope(user);
    const facilities = await dashboardRepository.getFacilitiesWithLatestStock(scope);
    const drugCount = await drugRepository.count({});

    const stockByStatus = { adequate: 0, low: 0, critical: 0, stockout: 0 };
    const seenDrugs = new Set<string>();

    for (const facility of facilities) {
      const latestByDrug = new Map<string, StockStatus>();
      for (const entry of facility.stockEntries) {
        if (!latestByDrug.has(entry.drugId)) {
          latestByDrug.set(entry.drugId, entry.status);
        }
      }
      for (const [drugId, status] of latestByDrug) {
        seenDrugs.add(`${facility.id}:${drugId}`);
        if (status === 'ADEQUATE') stockByStatus.adequate += 1;
        if (status === 'LOW') stockByStatus.low += 1;
        if (status === 'CRITICAL') stockByStatus.critical += 1;
        if (status === 'STOCKOUT') stockByStatus.stockout += 1;
      }
    }

    const severityGroups = await alertRepository.countBySeverity(scope);
    const alertsBySeverity = { critical: 0, warning: 0, info: 0 };
    for (const group of severityGroups) {
      if (group.severity === 'CRITICAL') alertsBySeverity.critical = group._count;
      if (group.severity === 'WARNING') alertsBySeverity.warning = group._count;
      if (group.severity === 'INFO') alertsBySeverity.info = group._count;
    }

    const now = new Date();
    const periodLabel = now.toLocaleDateString('en-UG', { month: 'long', year: 'numeric' });

    return {
      periodLabel,
      totalFacilities: await dashboardRepository.countFacilities(scope),
      totalDrugsTracked: seenDrugs.size || drugCount,
      stockouts: stockByStatus.stockout,
      lowStock: stockByStatus.low,
      criticalStock: stockByStatus.critical,
      activeAlerts: await dashboardRepository.countActiveAlerts(scope),
      resolvedAlerts: await alertRepository.countResolved(scope),
      alertsBySeverity,
      stockByStatus,
    };
  },
};
