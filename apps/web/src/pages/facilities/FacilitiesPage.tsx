import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardSection } from '@/components/molecules/DashboardSection';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFacilities } from '@/features/facilities/hooks/useFacilities';

export default function FacilitiesPage() {
  const facilities = useFacilities();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Facilities"
        description="Registered health facilities in your district or nationally"
      />

      <DashboardSection eyebrow="Directory" title="All facilities">
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {facilities.isLoading ? (
              <div className="space-y-2 p-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : !facilities.data?.length ? (
              <div className="p-6">
                <EmptyState title="No facilities found" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facilities.data.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>
                        <Link
                          to={`/facilities/${f.id}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {f.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{f.code}</TableCell>
                      <TableCell>{f.level.replace(/_/g, ' ')}</TableCell>
                      <TableCell>{f.districtName}</TableCell>
                      <TableCell>
                        <Badge variant={f.isActive ? 'success' : 'secondary'}>
                          {f.isActive ? 'Active' : 'Inactive'}
                        </Badge>
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
