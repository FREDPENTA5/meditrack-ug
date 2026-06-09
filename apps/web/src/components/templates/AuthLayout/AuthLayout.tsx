import { Outlet, Link } from 'react-router-dom';
import { Activity, ArrowLeft } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-surface-page">
      <aside className="relative hidden w-[48%] overflow-hidden bg-primary-950 lg:flex lg:flex-col">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 80%, var(--color-primary-600) 0%, transparent 50%), radial-gradient(circle at 80% 20%, var(--color-primary-700) 0%, transparent 40%)',
          }}
          aria-hidden="true"
        />
        <div className="landing-grid absolute inset-0 opacity-20" aria-hidden="true" />

        <div className="relative flex flex-1 flex-col justify-between p-10 xl:p-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 shadow-lg ring-1 ring-white/10">
              <Activity className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-heading text-xl font-bold text-white">MediTrack UG</span>
          </div>

          <div className="max-w-lg space-y-5">
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
              Clinical confidence for every health facility
            </h1>
            <p className="text-lg leading-relaxed text-primary-100">
              Real-time drug stock alerts connecting Gayaza Hospital and Wakiso District — built for
              clarity under pressure.
            </p>
            <ul className="space-y-2 text-sm text-primary-200">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                Instant stock-out notifications
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                Works on low-end Android over 2G/3G
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-400" />
                Role-based district &amp; facility views
              </li>
            </ul>
          </div>

          <p className="text-xs text-primary-400">
            © MediTrack UG · Uganda Ministry of Health aligned
          </p>
        </div>
      </aside>

      <main className="flex w-full flex-1 flex-col lg:w-[52%]">
        <div className="flex items-center justify-between px-4 py-4 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <Activity className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="font-heading text-base font-bold">MediTrack UG</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-8">
          <div className="w-full max-w-md">
            <div className="rounded-2xl border border-border-subtle bg-surface-card p-6 shadow-sm sm:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
