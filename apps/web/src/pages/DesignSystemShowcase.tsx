import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { Skeleton } from '../components/atoms/Skeleton';
import { Spinner } from '../components/atoms/Spinner';

export function DesignSystemShowcase() {
  return (
    <main className="mx-auto max-w-content space-y-8 p-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-widest text-text-brand">
          MediTrack UG
        </p>
        <h1 className="font-heading text-3xl font-bold text-text-primary">Clinical Confidence</h1>
        <p className="max-w-2xl text-text-secondary">
          Design system foundation for Uganda health facility stock management — built for clarity
          under pressure on low-end devices.
        </p>
      </header>

      <section className="rounded-lg bg-surface-card p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section className="rounded-lg bg-surface-card p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-semibold">Status Badges</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="adequate">Adequate</Badge>
          <Badge variant="low">Low Stock</Badge>
          <Badge variant="critical">Stock-out</Badge>
          <Badge variant="unknown">Not Reported</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      <section className="rounded-lg bg-surface-card p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-semibold">Form Inputs</h2>
        <div className="grid max-w-md gap-4">
          <Input placeholder="Drug quantity" type="number" />
          <Input
            placeholder="Email address"
            type="email"
            error
            errorMessage="Enter a valid email"
          />
        </div>
      </section>

      <section className="rounded-lg bg-surface-card p-6 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-semibold">Loading States</h2>
        <div className="flex items-center gap-6">
          <Spinner />
          <Skeleton width={200} height={16} />
          <Skeleton width={48} height={48} className="rounded-full" />
        </div>
      </section>
    </main>
  );
}
