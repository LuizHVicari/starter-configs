'use client';

import { Check, Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

import { Show } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggler({
  ...properties
}: React.ComponentProps<typeof DropdownMenu>): React.JSX.Element {
  const { setTheme, theme } = useTheme();

  const getThemeIcon = (): React.JSX.Element => {
    if (theme === 'system') {
      return <SunMoon />;
    }
    if (theme === 'light') {
      return <Sun />;
    }
    return <Moon />;
  };

  return (
    <DropdownMenu data-test-id="theme-toggler" {...properties}>
      <DropdownMenuTrigger asChild data-test-id="theme-toggler-trigger">
        <Button size="icon" variant="ghost">
          {getThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex justify-between gap-2"
          data-test-id="theme-toggler-light"
          onClick={() => setTheme('light')}
        >
          <span className="flex gap-2 items-center">
            <Sun /> Light
          </span>
          <Show when={theme === 'light'}>
            <Check />
          </Show>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between items-center gap-2"
          data-test-id="theme-toggler-dark"
          onClick={() => setTheme('dark')}
        >
          <span className="flex gap-2 items-center">
            <Moon /> Dark
          </span>
          <Show when={theme === 'dark'}>
            <Check />
          </Show>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-between gap-2"
          data-test-id="theme-toggler-system"
          onClick={() => setTheme('system')}
        >
          <span className="flex gap-2 items-center">
            <SunMoon /> System
          </span>
          <Show when={theme === 'system'}>
            <Check />
          </Show>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
