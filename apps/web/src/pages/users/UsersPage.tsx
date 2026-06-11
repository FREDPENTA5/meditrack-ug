import { useState } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@meditrack/shared';
import type { RegisterInput } from '@meditrack/shared';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardSection } from '@/components/molecules/DashboardSection';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/atoms/Button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatRole } from '@/lib/navigation';
import { useSetUserActive, useUsers, useCreateUser } from '@/features/users/hooks/useUsers';

export default function UsersPage() {
  const users = useUsers();
  const setActive = useSetUserActive();
  const createUser = useCreateUser();
  const [isCreating, setIsCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { role: 'FACILITY_WORKER' },
  });

  const onSubmit = (data: RegisterInput) => {
    setSuccessMsg('');
    createUser.mutate(data, {
      onSuccess: (created) => {
        setSuccessMsg(
          `✓ User "${created.fullName}" created. They will receive a confirmation email to activate their account.`,
        );
        setIsCreating(false);
        reset();
      },
    });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="User Management"
        description="Manage facility workers, district officers, and administrators"
        action={
          <Button
            onClick={() => {
              setIsCreating(!isCreating);
              setSuccessMsg('');
            }}
          >
            {isCreating ? 'Cancel' : 'Create User'}
          </Button>
        }
      />

      {successMsg && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMsg}
        </div>
      )}

      {isCreating && (
        <DashboardSection eyebrow="New" title="Create User">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...register('fullName')} />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email')} />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register('password')} />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    {...register('role')}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <option value="FACILITY_WORKER">Facility Worker</option>
                    <option value="DISTRICT_OFFICER">District Officer</option>
                    <option value="NMS_ADMIN">NMS Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                  {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
                </div>
                {createUser.isError && (
                  <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {(createUser.error as Error)?.message ??
                      'Failed to create user. Please try again.'}
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Button type="submit" loading={createUser.isPending}>
                    Save User
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </DashboardSection>
      )}

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
                          loading={setActive.isPending && setActive.variables?.id === u.id}
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
