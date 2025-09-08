'use client';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';

import { For } from '@/components/atoms/layout/for';
import { Show } from '@/components/atoms/layout/show';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
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

type FormComboboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type FormComboboxProperties<
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
  emptyText?: string;
  emptyTextKey?: string;
  searchPlaceholder?: string;
  searchPlaceholderKey?: string;
  options: FormComboboxOption[];
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  messageClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

function resolveText(
  directText: string | undefined,
  translationKey: string | undefined,
  t: (key: string) => string,
): string | undefined {
  return directText || (translationKey ? t(translationKey) : undefined);
}

function resolveTextWithDefault(
  directText: string | undefined,
  translationKey: string | undefined,
  defaultKey: string,
  t: (key: string) => string,
): string {
  return directText || t(translationKey || defaultKey);
}

function getSelectedOptionLabel(options: FormComboboxOption[], value: string): string | undefined {
  return options.find((option) => option.value === value)?.label;
}

export function FormCombobox<
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
  placeholderKey = 'forms.placeholders.comboboxSelect',
  emptyText,
  emptyTextKey = 'forms.messages.noOptionFound',
  searchPlaceholder,
  searchPlaceholderKey = 'forms.placeholders.search',
  options,
  containerClassName,
  labelClassName,
  descriptionClassName,
  messageClassName,
  triggerClassName,
  contentClassName,
}: FormComboboxProperties<TFieldValues, TName>): React.JSX.Element {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations();

  const displayLabel = resolveText(label, labelKey, t);
  const displayDescription = resolveText(description, descriptionKey, t);
  const displayPlaceholder = resolveTextWithDefault(
    placeholder,
    placeholderKey,
    'forms.placeholders.comboboxSelect',
    t,
  );
  const displayEmptyText = resolveTextWithDefault(
    emptyText,
    emptyTextKey,
    'forms.messages.noOptionFound',
    t,
  );
  const displaySearchPlaceholder = resolveTextWithDefault(
    searchPlaceholder,
    searchPlaceholderKey,
    'forms.placeholders.search',
    t,
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          <Show when={displayLabel}>
            <FormLabel className={labelClassName}>{displayLabel}</FormLabel>
          </Show>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  aria-expanded={open}
                  className={cn(
                    'w-full justify-between',
                    !field.value && 'text-muted-foreground',
                    triggerClassName,
                  )}
                  role="combobox"
                  variant="outline"
                >
                  {getSelectedOptionLabel(options, field.value) || displayPlaceholder}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn('w-full p-0', contentClassName)}>
              <Command>
                <CommandInput placeholder={displaySearchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{displayEmptyText}</CommandEmpty>
                  <CommandGroup>
                    <For each={options}>
                      {(option) => (
                        <CommandItem
                          key={option.value}
                          disabled={option.disabled}
                          value={option.label}
                          onSelect={() => {
                            field.onChange(option.value === field.value ? '' : option.value);
                            setOpen(false);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === option.value ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      )}
                    </For>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
