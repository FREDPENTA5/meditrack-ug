import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { Input as ShadcnInput } from '@/components/ui/input';
import { cn } from '@/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, errorMessage, startAdornment, endAdornment, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    if (!startAdornment && !endAdornment) {
      return (
        <div className="w-full">
          <ShadcnInput
            ref={ref}
            id={inputId}
            className={cn(error && 'border-destructive focus-visible:ring-destructive', className)}
            aria-invalid={error || undefined}
            aria-describedby={error && errorMessage ? `${inputId}-error` : undefined}
            {...props}
          />
          {error && errorMessage && (
            <p id={`${inputId}-error`} className="mt-1.5 text-sm text-destructive" role="alert">
              {errorMessage}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className="w-full">
        <div
          className={cn(
            'flex items-center gap-2 rounded-md border border-input bg-background px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring',
            error && 'border-destructive focus-within:ring-destructive',
            props.disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          {startAdornment && <span className="text-muted-foreground">{startAdornment}</span>}
          <ShadcnInput
            ref={ref}
            id={inputId}
            className={cn('border-0 px-0 shadow-none focus-visible:ring-0', className)}
            aria-invalid={error || undefined}
            aria-describedby={error && errorMessage ? `${inputId}-error` : undefined}
            {...props}
          />
          {endAdornment && <span className="text-muted-foreground">{endAdornment}</span>}
        </div>
        {error && errorMessage && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-destructive" role="alert">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
