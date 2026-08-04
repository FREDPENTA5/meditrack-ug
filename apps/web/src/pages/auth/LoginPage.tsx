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
      <header className="flex flex-col items-center text-center">
        <img src="/logo.png" alt="MediTrack Logo" className="h-12 w-auto mb-6 object-contain" />
        <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900">
          Welcome back
        </h1>
        <p className="mt-2 text-base text-neutral-500">
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-neutral-500 font-medium tracking-wider">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          type="button"
          className="flex-1 h-12 rounded-xl border-neutral-200 bg-white hover:bg-neutral-50"
          aria-label="Sign in with Google"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
        </Button>
        <Button
          variant="outline"
          type="button"
          className="flex-1 h-12 rounded-xl border-neutral-200 bg-white hover:bg-neutral-50"
          aria-label="Sign in with Apple"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05 1.8-3.08 1.8-1.09 0-1.44-.65-2.67-.65-1.2 0-1.6.65-2.67.65-1.09 0-2.05-.85-3.08-1.8C3.51 18.23 1.6 13.9 1.6 10.74c0-3.66 2.21-5.63 4.54-5.63 1.11 0 2.13.72 2.8.72.64 0 1.77-.79 3.06-.79 1.34 0 2.47.53 3.19 1.48-2.69 1.54-2.23 5.48.48 6.64-.61 1.79-1.57 3.55-2.64 4.88zM14.91 3.35c-.8.96-1.95 1.57-3.04 1.51-.15-1.12.35-2.28 1.11-3.21.78-.96 2.03-1.6 3.06-1.57.17 1.17-.33 2.33-1.13 3.27z" />
          </svg>
        </Button>
        <Button
          variant="outline"
          type="button"
          className="flex-1 h-12 rounded-xl border-neutral-200 bg-white hover:bg-neutral-50"
          aria-label="Sign in with Microsoft"
        >
          <svg className="h-5 w-5" viewBox="0 0 21 21">
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
