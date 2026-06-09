import { Skeleton as ShadcnSkeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/cn';

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export function Skeleton({ className, width, height, rounded = true }: SkeletonProps) {
  return (
    <ShadcnSkeleton
      className={cn(!rounded && 'rounded-none', className)}
      style={{ width, height }}
    />
  );
}
