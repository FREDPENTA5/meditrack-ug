import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { LoginSchema, type LoginInput } from '@meditrack/shared';
import { FormField } from '../../components/molecules/FormField';
import { Button } from '../../components/atoms/Button';
import { useLogin, useLoginErrorMessage } from '../../features/auth/hooks/useLogin';

export default function LoginPage() {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const serverError = useLoginErrorMessage(login.error);

  return (
    <div className="space-y-6">
      <header className="space-y-1.5 text-center sm:text-left">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-text-primary">
          Welcome back
        </h1>
        <p className="text-sm text-text-secondary">
          Sign in to manage drug stock for your facility or district.
        </p>
      </header>

      <form onSubmit={handleSubmit((data) => login.mutate(data))} className="space-y-4" noValidate>
        {serverError && (
          <div
            className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-700"
            role="alert"
          >
            {serverError}
          </div>
        )}

        <FormField
          label="Email address"
          type="email"
          autoComplete="email"
          required
          placeholder="you@facility.ug"
          errorMessage={errors.email?.message}
          {...register('email')}
        />

        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          errorMessage={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-border-default text-primary-600 focus:ring-border-brand"
              {...register('rememberMe')}
            />
            Remember me
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm font-medium text-text-brand hover:text-primary-700"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth loading={login.isPending} size="lg" className="mt-2">
          Sign in
        </Button>
      </form>

      <div className="rounded-lg bg-neutral-50 px-4 py-3 text-center text-xs text-text-secondary">
        <span className="font-medium text-text-primary">Demo:</span> pharmacist@gayaza.ug ·
        Password123!
      </div>
    </div>
  );
}
