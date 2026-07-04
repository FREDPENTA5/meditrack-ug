import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateProfileSchema, type UpdateProfileInput } from '@meditrack/shared';
import { PageHeader } from '@/components/molecules/PageHeader';
import { DashboardSection } from '@/components/molecules/DashboardSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/FormField';
import { Label } from '@/components/ui/label';
import { formatRole } from '@/lib/navigation';
import { useAuthStore } from '@/stores/authStore';
import { updateProfile } from '@/features/settings/api';
import { useMutation } from '@tanstack/react-query';

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const setAuth = useAuthStore((s) => s.setAuth);
  const accessToken = useAuthStore((s) => s.accessToken);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: { fullName: user?.fullName ?? '', phone: user?.phone ?? '' },
  });

  useEffect(() => {
    if (user) reset({ fullName: user.fullName, phone: user.phone ?? '' });
  }, [user, reset]);

  const save = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updated) => {
      if (user && accessToken) setAuth(updated, accessToken);
    },
  });

  if (!user) return null;

  return (
    <div className="space-y-8">
      <PageHeader title="Settings" description="Profile and account preferences" />

      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardSection eyebrow="Account" title="Profile">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-medium">Personal details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit((data) => save.mutate(data))} className="space-y-4">
                <FormField
                  label="Full name"
                  {...register('fullName')}
                  errorMessage={errors.fullName?.message}
                />
                <FormField
                  label="Phone"
                  placeholder="+256…"
                  {...register('phone')}
                  errorMessage={errors.phone?.message}
                />
                <div className="space-y-2">
                  <Label>Email</Label>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <p className="text-sm text-muted-foreground">{formatRole(user.role)}</p>
                </div>
                <Button type="submit" disabled={save.isPending}>
                  {save.isPending ? 'Saving…' : 'Save changes'}
                </Button>
                {save.isError && (
                  <p className="text-sm text-destructive">{(save.error as Error).message}</p>
                )}
                {save.isSuccess && <p className="text-sm text-success-700">Profile updated.</p>}
              </form>
            </CardContent>
          </Card>
        </DashboardSection>

        <DashboardSection eyebrow="Preferences" title="Notifications">
          <Card className="shadow-sm">
            <CardContent className="space-y-4 pt-6">
              <label className="flex items-center justify-between gap-4">
                <span className="text-sm">SMS alerts for stock-outs</span>
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-input" />
              </label>
              <label className="flex items-center justify-between gap-4">
                <span className="text-sm">Email digest (weekly)</span>
                <input type="checkbox" className="h-4 w-4 rounded border-input" />
              </label>
              <p className="text-xs text-muted-foreground">
                SMS delivery requires Africa&apos;s Talking integration on the API.
              </p>
            </CardContent>
          </Card>
        </DashboardSection>
      </div>
    </div>
  );
}
