import type { StockStatus } from '@meditrack/shared';
import type { AccessTokenPayload } from '../utils/jwt';
import { getFacilityScope } from '../utils/scope';
import { worstStatus } from '../utils/stockStatus';
import { dashboardRepository } from '../repositories/dashboard.repository';

function summarizeStatuses(entries: { status: StockStatus }[]) {
  const latestByDrug = entries;
  return {
    adequate: latestByDrug.filter((e) => e.status === 'ADEQUATE').length,
    low: latestByDrug.filter((e) => e.status === 'LOW').length,
    critical: latestByDrug.filter((e) => e.status === 'CRITICAL').length,
    stockout: latestByDrug.filter((e) => e.status === 'STOCKOUT').length,
  };
}

export const dashboardService = {
  async getSummary(user: AccessTokenPayload) {
    const scope = getFacilityScope(user);

    if (user.role === 'FACILITY_WORKER' && scope.facilityId) {
      const facilities = await dashboardRepository.getFacilitiesWithLatestStock({
        facilityId: scope.facilityId,
      });
      const facility = facilities[0];
      const latestByDrug = new Map<string, { status: StockStatus }>();

      for (const entry of facility?.stockEntries ?? []) {
        if (!latestByDrug.has(entry.drugId)) {
          latestByDrug.set(entry.drugId, { status: entry.status });
        }
      }

      const counts = summarizeStatuses(Array.from(latestByDrug.values()));

      return {
        drugsOk: counts.adequate,
        drugsLow: counts.low + counts.critical,
        drugsAtZero: counts.stockout,
        unresolvedAlerts: await dashboardRepository.countActiveAlerts(scope),
      };
    }

    const facilities = await dashboardRepository.getFacilitiesWithLatestStock(scope);
    let lowStockDrugs = 0;

    for (const facility of facilities) {
      const latestByDrug = new Map<string, StockStatus>();
      for (const entry of facility.stockEntries) {
        if (!latestByDrug.has(entry.drugId)) {
          latestByDrug.set(entry.drugId, entry.status);
        }
      }
      for (const status of latestByDrug.values()) {
        if (status === 'LOW' || status === 'CRITICAL') lowStockDrugs += 1;
      }
    }

    return {
      totalFacilities: await dashboardRepository.countFacilities(scope),
      stockoutsToday: await dashboardRepository.countStockoutsToday(scope),
      lowStockDrugs,
      unresolvedAlerts: await dashboardRepository.countActiveAlerts(scope),
    };
  },

  async getMap(user: AccessTokenPayload) {
    const scope = getFacilityScope(user);
    const facilities = await dashboardRepository.getFacilitiesWithLatestStock(scope);

    const features = facilities.map((facility) => {
      const latestByDrug = new Map<string, StockStatus>();
      for (const entry of facility.stockEntries) {
        if (!latestByDrug.has(entry.drugId)) {
          latestByDrug.set(entry.drugId, entry.status);
        }
      }

      const statuses = Array.from(latestByDrug.values());
      const status = statuses.length ? worstStatus(statuses) : 'ADEQUATE';
      const criticalDrugs = statuses.filter((s) => s === 'STOCKOUT' || s === 'CRITICAL').length;

      return {
        type: 'Feature' as const,
        geometry: {
          type: 'Point' as const,
          coordinates: [facility.longitude, facility.latitude] as [number, number],
        },
        properties: {
          id: facility.id,
          name: facility.name,
          code: facility.code,
          status,
          criticalDrugs,
        },
      };
    });

    return { type: 'FeatureCollection' as const, features };
  },

  async getRecentAlerts(user: AccessTokenPayload, limit = 10) {
    const scope = getFacilityScope(user);
    const alerts = await dashboardRepository.getRecentAlerts(scope, limit);

    return alerts.map((alert) => ({
      id: alert.id,
      facilityId: alert.facilityId,
      facilityName: alert.facility.name,
      drugName: alert.drugName,
      severity: alert.severity,
      type: alert.type,
      message: alert.message,
      status: alert.status,
      createdAt: alert.createdAt,
    }));
  },
};
