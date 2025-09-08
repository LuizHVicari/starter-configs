'use client';

import { useTranslations } from 'next-intl';
import { type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type FormCheckboxProperties<
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
} & Omit<React.ComponentProps<typeof Checkbox>, 'name' | 'checked' | 'onCheckedChange'>;

export function FormCheckbox<
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
  ...checkboxProperties
}: FormCheckboxProperties<TFieldValues, TName>): React.JSX.Element {
  const t = useTranslations();

  const displayLabel = label || (labelKey ? t(labelKey) : undefined);
  const displayDescription = description || (descriptionKey ? t(descriptionKey) : undefined);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          <div className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                {...checkboxProperties}
              />
            </FormControl>
            {displayLabel ? <FormLabel className={labelClassName}>{displayLabel}</FormLabel> : null}
          </div>
          {displayDescription ? (
            <FormDescription className={descriptionClassName}>{displayDescription}</FormDescription>
          ) : null}
          <FormMessage className={messageClassName}>
            {fieldState.error?.message ? t(fieldState.error.message) : undefined}
          </FormMessage>
        </FormItem>
      )}
    />
  );
}

export { Checkbox } from '@/components/ui/checkbox';
