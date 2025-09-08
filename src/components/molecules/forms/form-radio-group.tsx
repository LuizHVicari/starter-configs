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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type FormRadioGroupOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type FormRadioGroupProperties<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: ControllerProps<TFieldValues, TName>['control'];
  label?: string;
  labelKey?: string;
  description?: string;
  descriptionKey?: string;
  options: FormRadioGroupOption[];
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  messageClassName?: string;
  itemsClassName?: string;
} & Omit<React.ComponentProps<typeof RadioGroup>, 'name' | 'value' | 'onValueChange'>;

export function FormRadioGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  labelKey,
  description,
  descriptionKey,
  options,
  containerClassName,
  labelClassName,
  descriptionClassName,
  messageClassName,
  itemsClassName,
  ...radioGroupProperties
}: FormRadioGroupProperties<TFieldValues, TName>): React.JSX.Element {
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
            <RadioGroup
              className={itemsClassName}
              defaultValue={field.value}
              onValueChange={field.onChange}
              {...radioGroupProperties}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem disabled={option.disabled} value={option.value} />
                  <Label>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
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

export { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
