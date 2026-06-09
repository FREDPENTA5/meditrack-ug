import { format } from 'date-fns';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardSection } from '@/components/molecules/DashboardSection';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatRole } from '@/lib/navigation';
import { useSetUserActive, useUsers } from '@/features/users/hooks/useUsers';

export default function UsersPage() {
  const users = useUsers();
  const setActive = useSetUserActive();

  return (
    <div className="space-y-8">
      <PageHeader
        title="User Management"
        description="Manage facility workers, district officers, and administrators"
      />

      <DashboardSection eyebrow="Accounts" title="All users">
        <Card className="shadow-sm">
          <CardContent className="p-0">
            {users.isLoading ? (
              <Skeleton className="m-4 h-40 w-full" />
            ) : !users.data?.length ? (
              <div className="p-6">
                <EmptyState title="No users found" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Last login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.data.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.fullName}</TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell>{formatRole(u.role)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {u.facilityName ?? u.districtName ?? '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {u.lastLoginAt ? format(new Date(u.lastLoginAt), 'dd MMM yyyy') : 'Never'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={u.isActive ? 'success' : 'secondary'}>
                          {u.isActive ? 'Active' : 'Disabled'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={setActive.isPending}
                          onClick={() => setActive.mutate({ id: u.id, isActive: !u.isActive })}
                        >
                          {u.isActive ? 'Disable' : 'Enable'}
                        </Button>
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
