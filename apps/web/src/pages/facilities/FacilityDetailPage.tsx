import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardSection } from '@/components/molecules/DashboardSection';
import { StatusBadge } from '@/components/molecules/StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFacility, useFacilityStock } from '@/features/facilities/hooks/useFacilities';

export default function FacilityDetailPage() {
  const { id = '' } = useParams();
  const facility = useFacility(id);
  const stock = useFacilityStock(id);

  if (facility.isLoading) return <Skeleton className="h-64 w-full rounded-xl" />;
  if (!facility.data) return <p>Facility not found.</p>;

  const f = facility.data;

  return (
    <div className="space-y-8">
      <Link
        to="/facilities"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to facilities
      </Link>

      <PageHeader
        title={f.name}
        description={`${f.code} · ${f.level.replace(/_/g, ' ')} · ${f.districtName}`}
      />

      <DashboardSection eyebrow="Inventory" title="Current stock">
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {stock.isLoading ? (
              <Skeleton className="m-4 h-32 w-full" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Drug</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stock.data?.map((row) => (
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
  );
}
