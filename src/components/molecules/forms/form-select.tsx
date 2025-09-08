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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FormSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type FormSelectProperties<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: ControllerProps<TFieldValues, TName>['control'];
  label?: string;
  labelKey?: string;
  description?: string;
  descriptionKey?: string;
  placeholder?: string;
  placeholderKey?: string;
  options: FormSelectOption[];
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  messageClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
} & Omit<React.ComponentProps<typeof Select>, 'name' | 'value' | 'onValueChange'>;

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  labelKey,
  description,
  descriptionKey,
  placeholder,
  placeholderKey = 'forms.placeholders.selectOption',
  options,
  containerClassName,
  labelClassName,
  descriptionClassName,
  messageClassName,
  triggerClassName,
  contentClassName,
  ...selectProperties
}: FormSelectProperties<TFieldValues, TName>): React.JSX.Element {
  const t = useTranslations();

  const displayLabel = label || (labelKey ? t(labelKey) : undefined);
  const displayDescription = description || (descriptionKey ? t(descriptionKey) : undefined);
  const displayPlaceholder = placeholder || t(placeholderKey);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          {displayLabel ? <FormLabel className={labelClassName}>{displayLabel}</FormLabel> : null}
          <Select defaultValue={field.value} onValueChange={field.onChange} {...selectProperties}>
            <FormControl>
              <SelectTrigger className={triggerClassName}>
                <SelectValue placeholder={displayPlaceholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className={contentClassName}>
              {options.map((option) => (
                <SelectItem key={option.value} disabled={option.disabled} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
