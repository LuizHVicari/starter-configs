'use client';

import { useTranslations } from 'next-intl';
import { type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormInputProperties<
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
} & Omit<React.ComponentProps<typeof Input>, 'name'>;

export function FormInput<
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
  ...inputProperties
}: FormInputProperties<TFieldValues, TName>): React.JSX.Element {
  const t = useTranslations();

  const displayLabel = label || (labelKey ? t(labelKey) : undefined);
  const displayDescription = description || (descriptionKey ? t(descriptionKey) : undefined);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          {displayLabel ? <FormLabel className={labelClassName}>{displayLabel}</FormLabel> : null}
          <FormControl>
            <Input {...field} {...inputProperties} />
          </FormControl>
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

export { Input } from '@/components/ui/input';
