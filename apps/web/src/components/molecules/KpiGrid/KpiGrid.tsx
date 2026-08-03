import { cn } from '@/lib/cn';

export function KpiGrid({
  children,
  columns = 3,
  className,
}: {
  children: React.ReactNode;
  columns?: 3 | 4;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid gap-4',
        columns === 4 ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
}
