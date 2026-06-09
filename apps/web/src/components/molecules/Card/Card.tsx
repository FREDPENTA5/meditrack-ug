import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/cn';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  title?: string;
  description?: string;
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export function Card({ children, className, padding = 'md', title, description }: CardProps) {
  if (title) {
    return (
      <ShadcnCard className={className}>
        <CardHeader className={cn(paddingMap[padding], 'pb-4')}>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className={cn(paddingMap[padding], 'pt-0')}>{children}</CardContent>
      </ShadcnCard>
    );
  }

  return <ShadcnCard className={cn(paddingMap[padding], className)}>{children}</ShadcnCard>;
}

export { CardContent, CardHeader, CardTitle, CardDescription };
