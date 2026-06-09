import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, ShieldCheck, Map, Smartphone, BarChart3, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Pill,
    title: 'Real-time Inventory Tracking',
    description:
      'Monitor essential drug levels across all facilities instantly. Predict stock-outs before they impact patient care.',
  },
  {
    icon: Map,
    title: 'District-Wide Visibility',
    description:
      'A comprehensive live map provides status-coded markers for every registered health center in the district.',
  },
  {
    icon: Smartphone,
    title: 'Accessible Anywhere',
    description:
      'Designed as a progressive web app optimized for low-bandwidth environments and mobile devices.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Compliant',
    description:
      'Role-based access controls, strict audit trails, and encrypted data storage aligned with Ministry of Health standards.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20">
              <Activity className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="font-heading text-lg font-bold tracking-tight">MediTrack UG</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/auth/login"
              className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
            >
              Sign in
            </Link>
            <Button asChild size="sm" className="rounded-full px-5 shadow-sm">
              <Link to="/auth/login">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.15),rgba(255,255,255,0))]" />
          <div className="landing-grid absolute inset-0 -z-10 opacity-[0.15]" aria-hidden="true" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
                Live in Wakiso District
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-heading text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:leading-[1.1]"
              >
                Prevent Drug Stock-outs. <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">
                  Save Lives.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
              >
                A unified platform connecting health facilities with district authorities for
                real-time inventory visibility and proactive supply chain management.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 h-12 shadow-lg shadow-primary/20 transition-transform hover:scale-105"
                >
                  <Link to="/auth/login">
                    Access Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full px-8 h-12"
                >
                  <a href="#features">Explore Features</a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
              className="mx-auto mt-20 max-w-5xl rounded-2xl border bg-card/50 p-2 shadow-2xl backdrop-blur-sm ring-1 ring-white/10"
            >
              <div className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-xl bg-border sm:grid-cols-3">
                {[
                  { value: '84%', label: 'Faster response times', icon: BarChart3 },
                  { value: '< 15 min', label: 'Average alert delivery', icon: Activity },
                  { value: '24/7', label: 'Continuous monitoring', icon: Map },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-card p-8 sm:p-10 transition-colors hover:bg-card/80"
                    >
                      <Icon className="h-6 w-6 text-primary mb-4 opacity-80" />
                      <p className="font-heading text-4xl font-bold tracking-tight text-foreground">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-24 sm:py-32 bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Purpose-built for healthcare logistics
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to maintain continuous stock availability, designed with input
                from clinical officers.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
                  >
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span>© {new Date().getFullYear()} MediTrack UG. Aligned with MoH guidelines.</span>
          </div>
          <div className="flex gap-6">
            <Link
              to="/auth/login"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Staff Portal
            </Link>
            <a
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
