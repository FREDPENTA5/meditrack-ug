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
    <div className={cn('bg-card px-5 py-4 sm:px-6 sm:py-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        {Icon && (
          <Icon
            className={cn(
              'h-4 w-4 shrink-0',
              shouldEmphasize && variant === 'critical'
                ? 'text-destructive/70'
                : shouldEmphasize && variant === 'low'
                  ? 'text-warning-600/70'
                  : 'text-muted-foreground/60',
            )}
            aria-hidden="true"
          />
        )}
      </div>
      <p
        className={cn(
          'mt-2 font-heading text-3xl font-bold tabular-nums tracking-tight',
          shouldEmphasize ? valueStyles[variant] : 'text-foreground',
        )}
      >
        {value}
      </p>
      {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
