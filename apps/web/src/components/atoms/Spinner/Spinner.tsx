import { cn } from '../../../lib/cn';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerColor = 'primary' | 'white' | 'muted';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
  label?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
};

const colorClasses: Record<SpinnerColor, string> = {
  primary: 'border-primary-200 border-t-primary-600',
  white: 'border-white/30 border-t-white',
  muted: 'border-neutral-200 border-t-neutral-500',
};

export function Spinner({
  size = 'md',
  color = 'primary',
  className,
  label = 'Loading',
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-block animate-spin rounded-full motion-reduce:animate-none',
        sizeClasses[size],
        colorClasses[color],
        className,
      )}
    />
  );
}
