import type { BatchStockEntryInput } from '@meditrack/shared';
import { supabase } from '@/lib/supabase';

export interface StockRow {
  id: string;
  facilityId: string;
  drugId: string;
  drugName: string;
  category: string;
  quantity: number;
  unit: string;
  status: string;
  daysRemaining: number | null;
  entryDate: string;
  reportedBy: string;
}

export async function fetchFacilityStock(facilityId: string): Promise<StockRow[]> {
  const { data, error } = await supabase
    .from('stock_entries')
    .select(
      `
      id,
      facility_id,
      drug_id,
      quantity,
      unit,
      status,
      days_remaining,
      entry_date,
      reported_by_id,
      drugs ( name, category )
    `,
    )
    .eq('facility_id', facilityId)
    .order('entry_date', { ascending: false });

  if (error) {
    throw new Error(error.message || 'Failed to load stock');
  }

  // Group by drug to get latest
  const latestByDrug = new Map<string, any>();
  for (const row of data || []) {
    if (!latestByDrug.has(row.drug_id)) {
      latestByDrug.set(row.drug_id, row);
    }
  }

  return Array.from(latestByDrug.values()).map((row) => ({
    id: row.id,
    facilityId: row.facility_id,
    drugId: row.drug_id,
    drugName: row.drugs?.name || 'Unknown Drug',
    category: row.drugs?.category || 'OTHER',
    quantity: row.quantity,
    unit: row.unit,
    status: row.status,
    daysRemaining: row.days_remaining,
    entryDate: row.entry_date,
    reportedBy: row.reported_by_id,
  }));
}

export async function submitStockEntry(payload: BatchStockEntryInput) {
  const { entries, facilityId } = payload;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Not authenticated');
  }

  // For each entry, fetch the drug threshold and calculate real stock status
  const inserts = await Promise.all(
    entries.map(async (e) => {
      // Fetch threshold for this drug+facility (falls back to drug-level threshold)
      const { data: thresholds } = await supabase
        .from('thresholds')
        .select('low_days, critical_days, avg_daily_usage')
        .eq('drug_id', e.drugId)
        .or(`facility_id.eq.${facilityId},facility_id.is.null`)
        .order('facility_id', { ascending: false }) // facility-specific wins over global
        .limit(1);

      const threshold = thresholds?.[0] ?? {
        low_days: 14,
        critical_days: 7,
        avg_daily_usage: 10,
      };

      const qty = Number(e.quantity);
      let status: string;
      let daysRemaining: number | null = null;

      if (qty === 0) {
        status = 'STOCKOUT';
        daysRemaining = 0;
      } else if (threshold.avg_daily_usage <= 0) {
        status = 'ADEQUATE';
      } else {
        daysRemaining = qty / threshold.avg_daily_usage;
        if (daysRemaining > threshold.low_days) {
          status = 'ADEQUATE';
        } else if (daysRemaining > threshold.critical_days) {
          status = 'LOW';
        } else {
          status = 'CRITICAL';
        }
      }

      return {
        facility_id: facilityId,
        drug_id: e.drugId,
        quantity: qty,
        unit: e.unit || 'Units',
        reported_by_id: user.id,
        entry_date: new Date().toISOString(),
        status,
        days_remaining: daysRemaining,
        notes: e.notes ?? null,
      };
    }),
  );

  const { error } = await supabase.from('stock_entries').insert(inserts);
  if (error) throw new Error(error.message || 'Failed to submit stock');

  return true;
}
