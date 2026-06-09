import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  showStatus?: boolean;
  isOnline?: boolean;
  className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function Avatar({
  name,
  src,
  size = 'md',
  showStatus = false,
  isOnline = false,
  className,
}: AvatarProps) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <ShadcnAvatar className={sizeClasses[size]}>
        {src && <AvatarImage src={src} alt={name} />}
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </ShadcnAvatar>
      <span className="sr-only">{name}</span>
      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background',
            isOnline ? 'bg-success-500' : 'bg-muted-foreground',
          )}
          aria-label={isOnline ? 'Online' : 'Offline'}
        />
      )}
    </span>
  );
}
