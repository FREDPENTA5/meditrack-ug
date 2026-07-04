import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Pill, Activity, Plus } from 'lucide-react';
import { format } from 'date-fns';

import { PageHeader } from '@/components/molecules/PageHeader';
import { StatusBadge } from '@/components/molecules/StatusBadge';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Combobox } from '@/components/molecules/Combobox';

import { useAuthStore } from '@/stores/authStore';
import { useFacilityStock, useSubmitStock } from '@/features/stock/hooks/useStock';
import { fetchDrugs } from '@/features/drugs/api';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

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

  const drugOptions =
    drugs.data?.map((d) => ({
      value: d.id,
      label: d.name,
    })) ?? [];

  return (
    <div className="space-y-8 pb-10">
      <PageHeader title="Stock Entry" description="Log current drug quantities for your facility" />

      <div className="grid gap-8 xl:grid-cols-[380px_1fr] items-start">
        {/* LEFT PANEL - IMMERSIVE FORM */}
        <Card className="sticky top-24 overflow-hidden border-border bg-card shadow-lg shadow-neutral-200/40">
          <div className="bg-primary/5 px-6 py-8 sm:px-8 border-b border-border/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Pill className="w-32 h-32 text-primary" />
            </div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground relative z-10">
              Log Inventory
            </h2>
            <p className="text-sm text-muted-foreground mt-2 relative z-10">
              Select a drug and accurately record the current physical count in the storage
              facility.
            </p>
          </div>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="drug" className="text-sm font-medium">
                  Select Drug
                </Label>
                <Combobox
                  options={drugOptions}
                  value={drugId}
                  onChange={setDrugId}
                  placeholder="Search and select a drug..."
                  searchPlaceholder="Search drugs..."
                  className="h-11 w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Quantity
                  </Label>
                  {selectedDrug && (
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {selectedDrug.unit}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="quantity"
                    type="number"
                    min={0}
                    step="any"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    className="h-14 text-xl font-medium pl-6 bg-neutral-50/50"
                    placeholder="0"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
                    <Activity className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Notes (optional)
                </Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Batch number, expiry, etc."
                  className="bg-neutral-50/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium shadow-sm"
                loading={submit.isPending}
                disabled={!drugId || !quantity}
              >
                <Plus className="mr-2 h-5 w-5" />
                Submit Entry
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT PANEL - STAGGERED TABLE */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-semibold tracking-tight">Current Stock Levels</h3>
            <span className="text-sm text-muted-foreground">
              {stock.data?.length ?? 0} total items
            </span>
          </div>

          <Card className="shadow-sm border-border overflow-hidden">
            <CardContent className="p-0">
              {stock.isLoading ? (
                <div className="space-y-2 p-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : !stock.data?.length ? (
                <div className="p-12">
                  <EmptyState
                    title="No stock entries yet"
                    description="Log your first stock entry using the form on the left."
                  />
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-neutral-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-medium h-12">Drug</TableHead>
                      <TableHead className="font-medium h-12">Quantity</TableHead>
                      <TableHead className="font-medium h-12">Status</TableHead>
                      <TableHead className="font-medium h-12 text-right">Last updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <motion.tbody
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="divide-y divide-border"
                  >
                    {stock.data.map((row) => (
                      <motion.tr
                        key={row.id}
                        variants={itemVariants}
                        className="group hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-medium py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <Pill className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-foreground">{row.drugName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="tabular-nums font-medium text-foreground py-4">
                          {row.quantity.toLocaleString()}{' '}
                          <span className="text-muted-foreground text-sm font-normal ml-1">
                            {row.unit}
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <StatusBadge status={row.status} />
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground py-4">
                          {format(new Date(row.entryDate), 'MMM d, yyyy')}
                        </TableCell>
                      </motion.tr>
                    ))}
                  </motion.tbody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
