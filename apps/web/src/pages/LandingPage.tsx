import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Bell, MapPin, Shield, Smartphone } from 'lucide-react';
import { Button } from '../components/atoms/Button';

const features = [
  {
    icon: Bell,
    title: 'Real-time stock-out alerts',
    description:
      'Instant SMS and dashboard alerts when critical drugs hit zero — before patients are turned away.',
  },
  {
    icon: MapPin,
    title: 'District-wide visibility',
    description:
      'Officers monitor every facility on a live map with status-coded markers across Wakiso and beyond.',
  },
  {
    icon: Smartphone,
    title: 'Works on any device',
    description: 'PWA for low-end Android over 2G/3G, plus USSD for feature phones in the field.',
  },
  {
    icon: Shield,
    title: 'Data you can trust',
    description:
      'Role-based access, audit logs, and integrity-first design for high-stakes health decisions.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-page">
      <header className="glass-panel sticky top-0 z-30 border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
              <Activity className="h-[18px] w-[18px]" aria-hidden="true" />
            </div>
            <span className="font-heading text-lg font-bold text-text-primary">MediTrack UG</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/auth/login"
              className="hidden text-sm font-medium text-text-secondary transition-colors hover:text-text-primary sm:block"
            >
              Sign in
            </Link>
            <Link to="/auth/login">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="landing-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
              Uganda health facilities
            </p>
            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
              Stop drug stock-outs before they cost lives
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              MediTrack UG connects facility pharmacies with district health authorities in real
              time — starting with Gayaza Hospital, Wakiso District.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth/login">
                <Button size="lg" className="inline-flex items-center gap-2">
                  Sign in to dashboard
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg">
                  Learn more
                </Button>
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {[
              { value: '84%', label: 'of facilities report stock-outs' },
              { value: '< 15 min', label: 'alert delivery target' },
              { value: '24/7', label: 'district visibility' },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel rounded-xl p-5 shadow-sm">
                <p className="font-heading text-2xl font-bold text-primary-600">{stat.value}</p>
                <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-t border-border-subtle bg-surface-card py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-text-primary">
              Built for the reality of Ugandan health centres
            </h2>
            <p className="mt-3 text-text-secondary">
              Clinical confidence — clear, authoritative, and instantly scannable under pressure.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="group rounded-xl border border-border-subtle bg-surface-page p-6 transition-all hover:border-primary-200 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-primary-50 p-3 text-primary-600 ring-1 ring-primary-100 transition-colors group-hover:bg-primary-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border-subtle py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-text-tertiary sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} MediTrack UG · Ministry of Health aligned</p>
          <Link to="/auth/login" className="font-medium text-text-brand hover:text-primary-700">
            Staff sign in →
          </Link>
        </div>
      </footer>
    </div>
  );
}
