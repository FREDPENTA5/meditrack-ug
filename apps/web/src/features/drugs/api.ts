import type { Drug } from '@meditrack/shared';
import { supabase } from '@/lib/supabase';

export async function fetchDrugs(search?: string): Promise<Drug[]> {
  let query = supabase.from('drugs').select('*').order('name').limit(100);

  if (search?.trim()) {
    const term = `%${search.trim()}%`;
    query = query.or(`name.ilike.${term},generic_name.ilike.${term}`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message || 'Failed to load drugs');
  }

  return (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    genericName: row.generic_name,
    category: row.category,
    unit: row.unit,
    emhsCode: row.emhs_code,
    description: row.description,
    createdAt: new Date(row.created_at),
  }));
}
