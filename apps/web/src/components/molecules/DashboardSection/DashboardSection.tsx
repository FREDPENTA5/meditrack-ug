import { cn } from '@/lib/cn';

export interface DashboardSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardSection({
  eyebrow,
  title,
  description,
  action,
  children,
  className,
}: DashboardSectionProps) {
  const showHeader = eyebrow || title || description || action;

  return (
    <section className={cn('space-y-4', className)}>
      {showHeader && (
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 space-y-1">
            {eyebrow && (
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-lg font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
