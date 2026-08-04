import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function AuthLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-neutral-50 font-body">
      <aside className="relative hidden w-[45%] overflow-hidden bg-neutral-950 lg:flex lg:flex-col">
        {/* Subtle noise/grid overlay instead of generic radial gradient */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative flex flex-1 flex-col justify-between p-12 xl:p-16">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/logo-full.png"
                alt="MediTrack UG"
                className="h-24 w-auto object-contain brightness-0 invert"
              />
            </Link>
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
          <div className="flex items-center lg:hidden">
            <img src="/logo.png" alt="MediTrack UG" className="h-16 object-contain" />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-[420px]">
            <div className="rounded-[24px] bg-white p-8 sm:p-10 shadow-xl shadow-neutral-200/50 border border-neutral-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
