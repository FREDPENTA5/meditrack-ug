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
    <div className={cn('overflow-hidden rounded-xl border bg-card shadow-sm', className)}>
      <div
        className={cn(
          'grid divide-y',
          columns === 4
            ? 'sm:grid-cols-2 sm:divide-y xl:grid-cols-4 xl:divide-x xl:divide-y-0'
            : 'sm:grid-cols-3 sm:divide-x sm:divide-y-0',
        )}
      >
        {children}
      </div>
    </div>
  );
}
