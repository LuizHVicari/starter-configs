'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/features/common/shared/lib/utilities';

type FormDatePickerProperties<
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
  dateFormat?: string;
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  messageClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
} & Omit<React.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect' | 'autoFocus'>;

export function FormDatePicker<
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
  placeholderKey = 'forms.placeholders.pickDate',
  dateFormat = 'PPP',
  containerClassName,
  labelClassName,
  descriptionClassName,
  messageClassName,
  triggerClassName,
  contentClassName,
  ...calendarProperties
}: FormDatePickerProperties<TFieldValues, TName>): React.JSX.Element {
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
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground',
                    triggerClassName,
                  )}
                  variant="outline"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {field.value ? (
                    format(field.value, dateFormat)
                  ) : (
                    <span>{displayPlaceholder}</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent align="start" className={cn('w-auto p-0', contentClassName)}>
              <Calendar
                autoFocus
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                {...calendarProperties}
              />
            </PopoverContent>
          </Popover>
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

export { Calendar, CalendarDayButton } from '@/components/ui/calendar';
