import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Map, Smartphone, ArrowRight, Pill, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-body selection:bg-primary-100 selection:text-primary-900">
      {/* HEADER */}
      <header className="absolute top-0 w-full z-50 bg-transparent">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-primary-700 text-white shadow-sm">
              <Activity className="h-5 w-5" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-neutral-900">
              MediTrack UG
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/auth/login"
              className="hidden sm:block text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Staff Portal
            </Link>
            <Button
              asChild
              className="rounded-full px-6 h-10 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold shadow-md"
            >
              <Link to="/auth/login">Access System</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION (Clean, Light, Structured) */}
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-12 mx-auto overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-primary-100/50 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm mb-8">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-700">
                  MediTrack Uganda
                </span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="text-xs font-medium text-neutral-500">
                  Ministry of Health Aligned
                </span>
              </div>

              <h1 className="font-heading text-5xl sm:text-6xl md:text-[72px] font-bold tracking-tight text-neutral-900 leading-[1.1] mb-6">
                Precision logistics <br />
                <span className="text-primary-700">for public health.</span>
              </h1>

              <p className="text-lg sm:text-xl text-neutral-600 max-w-xl leading-relaxed mb-10">
                Unify your district's health facilities with real-time inventory visibility. Predict
                stock-outs, automate alerts, and ensure every clinic has the medicine it needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full h-14 px-8 bg-primary-700 hover:bg-primary-800 text-white text-base font-bold shadow-lg shadow-primary-700/20 transition-all hover:-translate-y-0.5"
                >
                  <Link to="/auth/login">
                    Access Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full h-14 px-8 text-base font-bold border-neutral-200 text-neutral-700 hover:bg-neutral-100 transition-all"
                >
                  <a href="#architecture">Explore Architecture</a>
                </Button>
              </div>
            </motion.div>

            {/* Right Asset (Real human-centric Unsplash photography) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
              className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-[32px] overflow-hidden shadow-2xl shadow-neutral-200/50 border border-white"
            >
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
                alt="Medical professional using tablet for logistics"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/20 to-transparent pointer-events-none" />

              {/* Floating UI Element for personality */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-white rounded-[20px] p-5 shadow-xl flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Activity className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-900">Stock levels optimized</p>
                  <p className="text-xs font-medium text-neutral-500">
                    Wakiso District • Updated just now
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* METRICS BAND */}
        <div className="border-y border-neutral-200 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
              {[
                { value: '84%', label: 'Faster Response Time', icon: Zap },
                { value: '< 15m', label: 'Alert Delivery', icon: Activity },
                { value: '24/7', label: 'Continuous Monitoring', icon: ShieldCheck },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center sm:px-8 first:pt-0 sm:first:px-0 sm:last:px-0"
                >
                  <stat.icon className="h-6 w-6 text-primary-700 mb-3 opacity-80" />
                  <h3 className="font-heading text-4xl font-extrabold text-neutral-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BENTO GRID FEATURES SECTION */}
        <section id="architecture" className="py-24 px-6 lg:px-12 bg-neutral-50 relative">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-16 max-w-2xl text-center mx-auto">
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-neutral-900 mb-4 tracking-tight">
                Engineered for resilience.
              </h2>
              <p className="text-lg text-neutral-500 leading-relaxed">
                A highly asymmetric architecture designed specifically for low-bandwidth
                environments, without sacrificing enterprise-grade security.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
              {/* Bento Item 1: Large Span */}
              <div className="md:col-span-2 group bg-white border border-neutral-200 rounded-[32px] p-10 hover:shadow-xl hover:shadow-neutral-200/50 hover:border-neutral-300 transition-all duration-300 overflow-hidden relative">
                <div className="relative z-10 h-full flex flex-col justify-end">
                  <div className="h-16 w-16 rounded-[16px] bg-neutral-50 shadow-sm border border-neutral-100 flex items-center justify-center mb-10 group-hover:-translate-y-1 transition-transform duration-300">
                    <Map className="h-7 w-7 text-neutral-700 group-hover:text-primary-700 transition-colors" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
                    District-Wide Visibility
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-lg max-w-md">
                    Instantly view the status of every registered health center. Pinpoint stock-outs
                    geographically before they escalate.
                  </p>
                </div>
              </div>

              {/* Bento Item 2: Small */}
              <div className="group bg-white border border-neutral-200 rounded-[32px] p-10 hover:shadow-xl hover:shadow-neutral-200/50 hover:border-neutral-300 transition-all duration-300">
                <div className="h-full flex flex-col justify-end">
                  <div className="h-14 w-14 rounded-[16px] bg-neutral-50 shadow-sm border border-neutral-100 flex items-center justify-center mb-8 group-hover:-translate-y-1 transition-transform duration-300">
                    <Pill className="h-6 w-6 text-neutral-700" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-neutral-900 mb-2">
                    Real-time Sync
                  </h3>
                  <p className="text-neutral-500 leading-relaxed">
                    Granular inventory tracking down to the individual batch level.
                  </p>
                </div>
              </div>

              {/* Bento Item 3: Small */}
              <div className="group bg-primary-950 text-white border border-primary-900 rounded-[32px] p-10 hover:shadow-xl hover:shadow-primary-900/20 transition-all duration-300">
                <div className="h-full flex flex-col justify-end">
                  <div className="h-14 w-14 rounded-[16px] bg-white/10 shadow-sm border border-white/10 flex items-center justify-center mb-8 group-hover:-translate-y-1 transition-transform duration-300">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Mobile Native</h3>
                  <p className="text-primary-200 leading-relaxed">
                    Operates flawlessly on ultra low-end devices over edge networks.
                  </p>
                </div>
              </div>

              {/* Bento Item 4: Large Span */}
              <div className="md:col-span-2 group bg-white border border-neutral-200 rounded-[32px] p-10 hover:shadow-xl hover:shadow-neutral-200/50 hover:border-neutral-300 transition-all duration-300">
                <div className="h-full flex flex-col justify-end">
                  <div className="h-16 w-16 rounded-[16px] bg-neutral-50 shadow-sm border border-neutral-100 flex items-center justify-center mb-10 group-hover:-translate-y-1 transition-transform duration-300">
                    <ShieldCheck className="h-7 w-7 text-neutral-700" />
                  </div>
                  <h3 className="font-heading text-3xl font-bold text-neutral-900 mb-3">
                    Enterprise Compliance
                  </h3>
                  <p className="text-neutral-500 leading-relaxed text-lg max-w-xl">
                    Built to Ministry of Health strict guidelines. Immutable audit trails, encrypted
                    data at rest, and highly configurable RBAC architecture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-neutral-200 py-12 px-6 lg:px-12">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-neutral-500">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-neutral-100 text-neutral-700">
              <Activity className="h-4 w-4" />
            </div>
            <span className="font-medium text-sm">© {new Date().getFullYear()} MediTrack UG.</span>
          </div>
          <div className="flex gap-8">
            <Link
              to="/auth/login"
              className="text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              Staff Portal
            </Link>
            <a
              href="#"
              className="text-sm font-bold text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              Privacy & Legal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
