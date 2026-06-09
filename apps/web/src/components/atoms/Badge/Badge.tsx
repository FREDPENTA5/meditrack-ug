import { Badge as ShadcnBadge, type BadgeProps as ShadcnBadgeProps } from '@/components/ui/badge';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'adequate' | 'low' | 'critical' | 'unknown' | 'info';

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantMap: Record<BadgeVariant, ShadcnBadgeProps['variant']> = {
  adequate: 'success',
  low: 'warning',
  critical: 'destructive',
  unknown: 'secondary',
  info: 'secondary',
};

export function Badge({ variant = 'unknown', children, className }: BadgeProps) {
  return (
    <ShadcnBadge variant={variantMap[variant]} className={cn(className)}>
      {children}
    </ShadcnBadge>
  );
}
