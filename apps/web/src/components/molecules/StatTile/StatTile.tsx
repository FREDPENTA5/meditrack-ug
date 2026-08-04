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
  default: 'text-neutral-800',
  adequate: 'text-neutral-800',
  low: 'text-neutral-800',
  critical: 'text-neutral-800',
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
        'rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <div className={cn('flex shrink-0 items-center justify-center', iconWrapStyles[variant])}>
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
