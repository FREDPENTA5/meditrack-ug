import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/cn';

export type StatTileVariant = 'default' | 'adequate' | 'low' | 'critical';

export interface StatTileProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  variant?: StatTileVariant;
  subtitle?: string;
  className?: string;
}

const valueStyles: Record<StatTileVariant, string> = {
  default: 'text-foreground',
  adequate: 'text-success-700',
  low: 'text-warning-700',
  critical: 'text-destructive',
};

export function StatTile({
  label,
  value,
  icon: Icon,
  variant = 'default',
  subtitle,
  className,
}: StatTileProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
      </CardHeader>
      <CardContent>
        <p
          className={cn('text-2xl font-semibold tabular-nums tracking-tight', valueStyles[variant])}
        >
          {value}
        </p>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
