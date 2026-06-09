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
  const { entries, facilityId, reportedById } = payload;
  const inserts = entries.map((e) => ({
    facility_id: facilityId,
    drug_id: e.drugId,
    quantity: e.quantity,
    unit: e.unit || 'Units',
    reported_by_id: reportedById || '00000000-0000-0000-0000-000000000000', // Needs actual user ID
    status: 'ADEQUATE', // Simplified for now
    notes: e.notes,
  }));

  const { error } = await supabase.from('stock_entries').insert(inserts);
  if (error) {
    throw new Error(error.message || 'Failed to submit stock');
  }
  return true;
}
