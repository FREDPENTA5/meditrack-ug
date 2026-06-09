import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardSection } from '@/components/molecules/DashboardSection';
import { StatusBadge } from '@/components/molecules/StatusBadge';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuthStore } from '@/stores/authStore';
import { useFacilityStock, useSubmitStock } from '@/features/stock/hooks/useStock';
import { fetchDrugs } from '@/features/drugs/api';
import { format } from 'date-fns';

export default function StockEntryPage() {
  const user = useAuthStore((s) => s.user);
  const facilityId = user?.facilityId ?? '';
  const stock = useFacilityStock(facilityId);
  const submit = useSubmitStock();

  const drugs = useQuery({ queryKey: ['drugs'], queryFn: () => fetchDrugs() });

  const [drugId, setDrugId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  const selectedDrug = drugs.data?.find((d) => d.id === drugId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!facilityId || !drugId || !selectedDrug) return;

    await submit.mutateAsync({
      facilityId,
      entries: [
        {
          drugId,
          quantity: Number(quantity),
          unit: selectedDrug.unit,
          notes: notes || undefined,
        },
      ],
    });

    setDrugId('');
    setQuantity('');
    setNotes('');
  };

  if (!facilityId) {
    return (
      <EmptyState
        title="No facility assigned"
        description="Your account is not linked to a facility. Contact your administrator."
      />
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Stock Entry" description="Log current drug quantities for your facility" />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-sm lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base font-medium">Log stock</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="drug">Drug</Label>
                <select
                  id="drug"
                  value={drugId}
                  onChange={(e) => setDrugId(e.target.value)}
                  required
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Select drug…</option>
                  {drugs.data?.map((drug) => (
                    <option key={drug.id} value={drug.id}>
                      {drug.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  Quantity {selectedDrug ? `(${selectedDrug.unit})` : ''}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min={0}
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Batch number, expiry, etc."
                />
              </div>
              <Button type="submit" className="w-full" loading={submit.isPending}>
                Submit entry
              </Button>
            </form>
          </CardContent>
        </Card>

        <DashboardSection
          className="lg:col-span-2"
          eyebrow="Inventory"
          title="Current stock levels"
          description="Latest reported quantities per drug"
        >
          <Card className="shadow-sm">
            <CardContent className="p-0">
              {stock.isLoading ? (
                <div className="space-y-2 p-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : !stock.data?.length ? (
                <div className="p-6">
                  <EmptyState
                    title="No stock entries yet"
                    description="Log your first stock entry using the form."
                  />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Drug</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stock.data.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-medium">{row.drugName}</TableCell>
                        <TableCell className="tabular-nums">
                          {row.quantity} {row.unit}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={row.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(row.entryDate), 'dd MMM yyyy')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </DashboardSection>
      </div>
    </div>
  );
}
