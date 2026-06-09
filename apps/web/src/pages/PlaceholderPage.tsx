import { PageHeader } from '../components/molecules/PageHeader';
import { Card } from '../components/molecules/Card';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} />
      <Card
        padding="lg"
        className="flex min-h-[240px] flex-col items-center justify-center text-center"
      >
        <p className="text-sm font-medium text-text-primary">Coming soon</p>
        <p className="mt-1 max-w-md text-sm text-text-secondary">
          This module is next in the build sequence. The layout and navigation are ready.
        </p>
      </Card>
    </div>
  );
}
