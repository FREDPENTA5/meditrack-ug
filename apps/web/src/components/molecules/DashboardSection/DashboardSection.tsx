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
  eyebrow: _eyebrow,
  title,
  description,
  action,
  children,
  className,
}: DashboardSectionProps) {
  const showHeader = title || description || action;

  return (
    <section className={cn('space-y-4', className)}>
      {showHeader && (
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0 space-y-0.5">
            {title && (
              <h2 className="font-heading text-base font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && <p className="text-[13px] text-muted-foreground">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
