import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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
import {
  useFacilities,
  useCreateFacility,
  useDistricts,
  useSetFacilityActive,
} from '@/features/facilities/hooks/useFacilities';
import type { CreateFacilityInput } from '@/features/facilities/api';

const FACILITY_LEVELS = [
  { value: 'HC_II', label: 'HC II' },
  { value: 'HC_III', label: 'HC III' },
  { value: 'HC_IV', label: 'HC IV' },
  { value: 'GENERAL_HOSPITAL', label: 'General Hospital' },
  { value: 'REGIONAL_REFERRAL', label: 'Regional Referral' },
];

export default function FacilitiesPage() {
  const facilities = useFacilities();
  const districts = useDistricts();
  const createFacility = useCreateFacility();
  const setActive = useSetFacilityActive();
  const [isCreating, setIsCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFacilityInput>({
    defaultValues: { level: 'HC_III', latitude: 0, longitude: 0 },
  });

  const onSubmit = (data: CreateFacilityInput) => {
    setSuccessMsg('');
    createFacility.mutate(
      { ...data, latitude: Number(data.latitude), longitude: Number(data.longitude) },
      {
        onSuccess: (created) => {
          setSuccessMsg(`✓ "${created.name}" added successfully.`);
          setIsCreating(false);
          reset();
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Facilities"
        description="Registered health facilities in your district or nationally"
        action={
          <Button
            onClick={() => {
              setIsCreating(!isCreating);
              setSuccessMsg('');
            }}
          >
            {isCreating ? 'Cancel' : 'Add Facility'}
          </Button>
        }
      />

      {successMsg && (
        <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMsg}
        </div>
      )}

      {isCreating && (
        <DashboardSection eyebrow="New" title="Create Facility">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
                {/* Name */}
                <div className="sm:col-span-2">
                  <Label htmlFor="fac-name">Facility Name *</Label>
                  <Input
                    id="fac-name"
                    placeholder="e.g. Kira Health Centre IV"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Code */}
                <div>
                  <Label htmlFor="fac-code">Facility Code *</Label>
                  <Input
                    id="fac-code"
                    placeholder="e.g. WAK-KIR-006"
                    {...register('code', { required: 'Code is required' })}
                  />
                  {errors.code && (
                    <p className="mt-1 text-xs text-destructive">{errors.code.message}</p>
                  )}
                </div>

                {/* Level */}
                <div>
                  <Label htmlFor="fac-level">Level *</Label>
                  <select
                    id="fac-level"
                    {...register('level', { required: true })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    {FACILITY_LEVELS.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <Label htmlFor="fac-district">District *</Label>
                  <select
                    id="fac-district"
                    {...register('districtId', { required: 'District is required' })}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  >
                    <option value="">Select district…</option>
                    {districts.data?.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  {errors.districtId && (
                    <p className="mt-1 text-xs text-destructive">{errors.districtId.message}</p>
                  )}
                </div>

                {/* Latitude */}
                <div>
                  <Label htmlFor="fac-lat">Latitude *</Label>
                  <Input
                    id="fac-lat"
                    type="number"
                    step="any"
                    placeholder="e.g. 0.3628"
                    {...register('latitude', {
                      required: 'Latitude is required',
                      valueAsNumber: true,
                    })}
                  />
                  {errors.latitude && (
                    <p className="mt-1 text-xs text-destructive">{errors.latitude.message}</p>
                  )}
                </div>

                {/* Longitude */}
                <div>
                  <Label htmlFor="fac-lng">Longitude *</Label>
                  <Input
                    id="fac-lng"
                    type="number"
                    step="any"
                    placeholder="e.g. 32.5827"
                    {...register('longitude', {
                      required: 'Longitude is required',
                      valueAsNumber: true,
                    })}
                  />
                  {errors.longitude && (
                    <p className="mt-1 text-xs text-destructive">{errors.longitude.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="fac-phone">Contact Phone</Label>
                  <Input id="fac-phone" placeholder="+256 …" {...register('contactPhone')} />
                </div>

                {/* Address */}
                <div>
                  <Label htmlFor="fac-address">Address</Label>
                  <Input id="fac-address" placeholder="Street / village" {...register('address')} />
                </div>

                {/* Error banner */}
                {createFacility.isError && (
                  <div className="sm:col-span-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {(createFacility.error as Error)?.message ?? 'Failed to create facility'}
                  </div>
                )}

                <div className="sm:col-span-2 flex gap-2 pt-2">
                  <Button type="submit" loading={createFacility.isPending}>
                    Save Facility
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </DashboardSection>
      )}

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
                    <TableHead />
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
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          loading={setActive.isPending && (setActive.variables as any)?.id === f.id}
                          onClick={() => setActive.mutate({ id: f.id, isActive: !f.isActive })}
                        >
                          {f.isActive ? 'Deactivate' : 'Activate'}
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
