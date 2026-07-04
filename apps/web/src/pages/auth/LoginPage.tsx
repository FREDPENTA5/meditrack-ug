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
    <div className="space-y-8">
      <header className="space-y-2 text-center sm:text-left">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900">
          Welcome back
        </h1>
        <p className="text-base text-neutral-500">
          Sign in to manage drug stock for your facility or district.
        </p>
      </header>

      <form onSubmit={handleSubmit((data) => login.mutate(data))} className="space-y-5" noValidate>
        {serverError && (
          <div
            className="rounded-[12px] border border-danger-200 bg-danger-50 px-4 py-3 text-sm font-medium text-danger-700"
            role="alert"
          >
            {serverError}
          </div>
        )}

        <div className="space-y-4">
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
        </div>

        <div className="flex items-center justify-between pt-2 pb-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-neutral-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-[4px] border-neutral-300 text-primary-700 focus:ring-primary-700"
              {...register('rememberMe')}
            />
            Remember me
          </label>
          <Link
            to="/auth/forgot-password"
            className="text-sm font-semibold text-primary-700 hover:text-primary-800 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          loading={login.isPending}
          size="lg"
          className="h-12 rounded-full text-base font-semibold shadow-md shadow-primary-700/20"
        >
          Sign in
        </Button>
      </form>

      <div className="rounded-[12px] bg-neutral-50 border border-neutral-100 px-4 py-3 text-center text-xs text-neutral-500">
        <span className="font-semibold text-neutral-700">Demo:</span> pharmacist@gayaza.ug ·
        Password123!
      </div>
    </div>
  );
}
