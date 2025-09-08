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
import { Switch } from '@/components/ui/switch';

type FormSwitchProperties<
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
} & Omit<React.ComponentProps<typeof Switch>, 'name' | 'checked' | 'onCheckedChange'>;

export function FormSwitch<
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
  ...switchProperties
}: FormSwitchProperties<TFieldValues, TName>): React.JSX.Element {
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
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                {...switchProperties}
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

export { Switch } from '@/components/ui/switch';
