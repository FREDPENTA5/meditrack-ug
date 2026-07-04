import { Outlet, Link } from 'react-router-dom';
import { Activity, ArrowLeft } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen bg-neutral-50 font-body">
      <aside className="relative hidden w-[45%] overflow-hidden bg-neutral-950 lg:flex lg:flex-col">
        {/* Subtle noise/grid overlay instead of generic radial gradient */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative flex flex-1 flex-col justify-between p-12 xl:p-16">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-primary-700 shadow-sm">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-white tracking-tight">
              MediTrack UG
            </span>
          </div>

          <div className="max-w-lg space-y-8">
            <h1 className="font-heading text-4xl font-semibold leading-[1.15] tracking-tight text-white xl:text-5xl">
              Precision logistics for Uganda's health network.
            </h1>
            <p className="text-lg leading-relaxed text-neutral-400">
              A unified platform connecting health facilities with district authorities for
              real-time inventory visibility.
            </p>
          </div>

          <p className="text-sm font-medium text-neutral-500">
            © {new Date().getFullYear()} MediTrack UG.
          </p>
        </div>
      </aside>

      <main className="flex w-full flex-1 flex-col lg:w-[55%] relative">
        <div className="absolute top-0 left-0 w-full flex items-center justify-between p-6 sm:p-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary-700 text-white">
              <Activity className="h-4 w-4" />
            </div>
            <span className="font-heading text-base font-bold text-neutral-900">MediTrack UG</span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-[420px]">
            <div className="rounded-[24px] bg-white p-8 sm:p-10 shadow-xl shadow-neutral-200/50 border border-neutral-100">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
