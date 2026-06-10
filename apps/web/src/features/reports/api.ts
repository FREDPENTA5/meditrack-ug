import type { ReportSummary } from '@meditrack/shared';
import { countActiveAlerts, fetchFacilitiesWithLatestStock } from '@/lib/facilityStock';
import { requireAuthProfile } from '@/lib/authUser';
import { summarizeStatuses } from '@/lib/stockStatus';
import { supabase } from '@/lib/supabase';

export async function fetchReportSummary(): Promise<ReportSummary> {
  const user = await requireAuthProfile();
  const facilities = await fetchFacilitiesWithLatestStock(user);

  const stockByStatus = { adequate: 0, low: 0, critical: 0, stockout: 0 };
  const seenDrugs = new Set<string>();

  for (const facility of facilities) {
    for (const [drugId, status] of facility.latestByDrug) {
      seenDrugs.add(`${facility.id}:${drugId}`);
      if (status === 'ADEQUATE') stockByStatus.adequate += 1;
      if (status === 'LOW') stockByStatus.low += 1;
      if (status === 'CRITICAL') stockByStatus.critical += 1;
      if (status === 'STOCKOUT') stockByStatus.stockout += 1;
    }
  }

  const { count: drugCount, error: drugError } = await supabase
    .from('drugs')
    .select('*', { count: 'exact', head: true });

  if (drugError) throw new Error(drugError.message);

  const { data: severityRows, error: severityError } = await supabase
    .from('alerts')
    .select('severity');

  if (severityError) throw new Error(severityError.message);

  const alertsBySeverity = { critical: 0, warning: 0, info: 0 };
  for (const row of severityRows || []) {
    if (row.severity === 'CRITICAL') alertsBySeverity.critical += 1;
    if (row.severity === 'WARNING') alertsBySeverity.warning += 1;
    if (row.severity === 'INFO') alertsBySeverity.info += 1;
  }

  const { count: resolvedAlerts, error: resolvedError } = await supabase
    .from('alerts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'RESOLVED');

  if (resolvedError) throw new Error(resolvedError.message);

  const now = new Date();
  const periodLabel = now.toLocaleDateString('en-UG', { month: 'long', year: 'numeric' });

  return {
    periodLabel,
    totalFacilities: facilities.length,
    totalDrugsTracked: seenDrugs.size || drugCount || 0,
    stockouts: stockByStatus.stockout,
    lowStock: stockByStatus.low,
    criticalStock: stockByStatus.critical,
    activeAlerts: await countActiveAlerts(user),
    resolvedAlerts: resolvedAlerts || 0,
    alertsBySeverity,
    stockByStatus,
  };
}
