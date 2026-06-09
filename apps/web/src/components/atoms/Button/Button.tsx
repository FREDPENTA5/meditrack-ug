import { forwardRef, type ButtonHTMLAttributes } from 'react';
import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
} from '@/components/ui/button';
import { Spinner } from '../Spinner';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantMap: Record<ButtonVariant, ShadcnButtonProps['variant']> = {
  primary: 'default',
  secondary: 'secondary',
  ghost: 'ghost',
  danger: 'destructive',
  outline: 'outline',
};

const sizeMap: Record<ButtonSize, ShadcnButtonProps['size']> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <ShadcnButton
        ref={ref}
        type={type}
        variant={variantMap[variant]}
        size={sizeMap[size]}
        disabled={isDisabled}
        className={cn(fullWidth && 'w-full', className)}
        {...props}
      >
        {loading && (
          <Spinner
            size="sm"
            color={variant === 'primary' || variant === 'danger' ? 'white' : 'primary'}
          />
        )}
        {children}
      </ShadcnButton>
    );
  },
);

Button.displayName = 'Button';
