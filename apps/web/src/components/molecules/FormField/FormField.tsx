import { forwardRef, type InputHTMLAttributes } from 'react';
import { useId } from 'react';
import { Label } from '../../atoms/Label';
import { Input } from '../../atoms/Input';
import { cn } from '../../../lib/cn';

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  containerClassName?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { label, helperText, errorMessage, required, containerClassName, id, name, ...inputProps },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId = id ?? name ?? generatedId;
    const hasError = Boolean(errorMessage);
    const describedBy = [
      helperText ? `${fieldId}-helper` : null,
      hasError ? `${fieldId}-error` : null,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={cn('space-y-2', containerClassName)}>
        <Label htmlFor={fieldId}>
          {label}
          {required && <span className="text-destructive"> *</span>}
        </Label>
        <Input
          ref={ref}
          id={fieldId}
          name={name}
          error={hasError}
          errorMessage={errorMessage}
          aria-describedby={describedBy || undefined}
          {...inputProps}
        />
        {helperText && !hasError && (
          <p id={`${fieldId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
