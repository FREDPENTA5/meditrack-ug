import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../../atoms/Input';
import { Spinner } from '../../atoms/Spinner';
import { cn } from '../../../lib/cn';

export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  debounceMs?: number;
  className?: string;
}

export function SearchInput({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = 'Search drugs, facilities…',
  loading = false,
  debounceMs = 300,
  className,
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const value = controlledValue ?? internalValue;

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs, onSearch]);

  const handleChange = (next: string) => {
    setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div className={cn('relative w-full max-w-md', className)}>
      <Input
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        startAdornment={<Search className="h-4 w-4" aria-hidden="true" />}
        endAdornment={
          loading ? (
            <Spinner size="sm" color="muted" />
          ) : value ? (
            <button
              type="button"
              onClick={() => handleChange('')}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null
        }
      />
    </div>
  );
}
