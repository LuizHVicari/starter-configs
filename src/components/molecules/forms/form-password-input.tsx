'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

import { Show } from '@/components/atoms/layout/show';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormPasswordInputProperties<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: ControllerProps<TFieldValues, TName>['control'];
  label?: string;
  labelKey?: string;
  description?: string;
  descriptionKey?: string;
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  messageClassName?: string;
} & Omit<React.ComponentProps<typeof Input>, 'name' | 'type'>;

function resolveText(
  directText: string | undefined,
  translationKey: string | undefined,
  t: (key: string) => string,
): string | undefined {
  return directText || (translationKey ? t(translationKey) : undefined);
}

export function FormPasswordInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  labelKey,
  description,
  descriptionKey,
  containerClassName,
  labelClassName,
  descriptionClassName,
  messageClassName,
  className,
  ...inputProperties
}: FormPasswordInputProperties<TFieldValues, TName>): React.JSX.Element {
  const [showPassword, setShowPassword] = React.useState(false);
  const t = useTranslations();

  const displayLabel = resolveText(label, labelKey, t);
  const displayDescription = resolveText(description, descriptionKey, t);

  const togglePasswordVisibility = (): void => {
    setShowPassword((previous) => !previous);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          <Show when={displayLabel}>
            <FormLabel className={labelClassName}>{displayLabel}</FormLabel>
          </Show>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                {...inputProperties}
                className={className}
                type={showPassword ? 'text' : 'password'}
              />
              <Button
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                size="sm"
                type="button"
                variant="ghost"
                onClick={togglePasswordVisibility}
              >
                <Show fallback={<EyeOffIcon className="h-4 w-4" />} when={showPassword}>
                  <EyeIcon className="h-4 w-4" />
                </Show>
                <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
              </Button>
            </div>
          </FormControl>
          <Show when={displayDescription}>
            <FormDescription className={descriptionClassName}>{displayDescription}</FormDescription>
          </Show>
          <FormMessage className={messageClassName}>
            <Show when={fieldState.error?.message}>
              {fieldState.error?.message ? t(fieldState.error.message) : undefined}
            </Show>
          </FormMessage>
        </FormItem>
      )}
    />
  );
}

export { Input } from '@/components/ui/input';
