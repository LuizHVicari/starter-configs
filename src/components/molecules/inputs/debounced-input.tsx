'use client';

import * as React from 'react';

import { Show } from '@/components/atoms/layout/show';
import { Input } from '@/components/ui/input';
import { cn } from '@/features/common/shared/lib/utilities';

interface DebouncedInputProperties extends Omit<React.ComponentProps<typeof Input>, 'onChange'> {
  value?: string;
  onChange: (value: string) => void;
  debounceMs?: number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
}

export function DebouncedInput({
  value: externalValue = '',
  onChange,
  debounceMs = 300,
  startIcon,
  endIcon,
  containerClassName,
  className,
  ...inputProperties
}: DebouncedInputProperties): React.JSX.Element {
  const [internalValue, setInternalValue] = React.useState(externalValue);

  // Debounce the external onChange callback
  const debouncedOnChange = React.useMemo(() => {
    const handler = (newValue: string): void => {
      onChange(newValue);
    };

    let timeoutId: NodeJS.Timeout;

    return (newValue: string): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handler(newValue), debounceMs);
    };
  }, [onChange, debounceMs]);

  // Update internal value when external value changes
  React.useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    debouncedOnChange(newValue);
  };

  const hasStartIcon = Boolean(startIcon);
  const hasEndIcon = Boolean(endIcon);

  return (
    <div className={cn('relative', containerClassName)}>
      <Show when={hasStartIcon}>
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {startIcon}
        </div>
      </Show>

      <Input
        {...inputProperties}
        className={cn(hasStartIcon && 'pl-10', hasEndIcon && 'pr-10', className)}
        value={internalValue}
        onChange={handleInputChange}
      />

      <Show when={hasEndIcon}>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {endIcon}
        </div>
      </Show>
    </div>
  );
}

export { Input } from '@/components/ui/input';
