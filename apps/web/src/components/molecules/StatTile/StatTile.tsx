import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export type StatTileVariant = 'default' | 'adequate' | 'low' | 'critical';

export interface StatTileProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: StatTileVariant;
  subtitle?: string;
  className?: string;
  emphasize?: boolean;
}

const iconWrapStyles: Record<StatTileVariant, string> = {
  default: 'bg-neutral-100 text-neutral-500',
  adequate: 'bg-success-50 text-success-600',
  low: 'bg-warning-50 text-warning-600',
  critical: 'bg-danger-50 text-danger-600',
};

const valueStyles: Record<StatTileVariant, string> = {
  default: 'text-foreground',
  adequate: 'text-foreground',
  low: 'text-foreground',
  critical: 'text-destructive',
};

export function StatTile({
  label,
  value,
  icon: Icon,
  variant = 'default',
  subtitle,
  className,
  emphasize = false,
}: StatTileProps) {
  const numericValue = typeof value === 'number' ? value : Number(value);
  const shouldEmphasize =
    emphasize || variant === 'critical' || (variant === 'low' && numericValue > 0);

  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <div
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
              iconWrapStyles[variant],
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
      </div>
      <p
        className={cn(
          'mt-2 font-heading text-[28px] font-bold tabular-nums tracking-tight',
          shouldEmphasize ? valueStyles[variant] : 'text-foreground',
        )}
      >
        {value}
      </p>
      {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
