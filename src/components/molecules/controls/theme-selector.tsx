'use client';

import { Check, Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { For, Show } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useColorTheme } from '@/features/common/client/providers/theme-provider';

const colorThemes = [
  { value: 'default', label: 'Default', color: 'bg-slate-500' },
  { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
  { value: 'green', label: 'Green', color: 'bg-green-500' },
  { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
  { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
] as const;

export function ThemeSelector(): React.JSX.Element {
  const { setTheme, theme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getThemeIcon = (): React.JSX.Element => {
    if (!mounted || !theme || theme === 'system') {
      return <SunMoon />;
    }
    if (theme === 'light') {
      return <Sun />;
    }
    return <Moon />;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          {getThemeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium">Light/Dark Mode</div>
        <DropdownMenuItem className="flex justify-between gap-2" onClick={() => setTheme('light')}>
          <span className="flex gap-2 items-center">
            <Sun className="h-4 w-4" /> Light
          </span>
          <Show when={theme === 'light'}>
            <Check className="h-4 w-4" />
          </Show>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex justify-between items-center gap-2"
          onClick={() => setTheme('dark')}
        >
          <span className="flex gap-2 items-center">
            <Moon className="h-4 w-4" /> Dark
          </span>
          <Show when={theme === 'dark'}>
            <Check className="h-4 w-4" />
          </Show>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center justify-between gap-2"
          onClick={() => setTheme('system')}
        >
          <span className="flex gap-2 items-center">
            <SunMoon className="h-4 w-4" /> System
          </span>
          <Show when={theme === 'system'}>
            <Check className="h-4 w-4" />
          </Show>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-2 py-1.5 text-sm font-medium">Color Theme</div>
        <For each={colorThemes}>
          {(themeOption) => (
            <DropdownMenuItem
              key={themeOption.value}
              className="flex justify-between gap-2"
              onClick={() => setColorTheme(themeOption.value)}
            >
              <span className="flex gap-2 items-center">
                <div className={`h-4 w-4 rounded-full ${themeOption.color}`} />
                {themeOption.label}
              </span>
              <Show when={colorTheme === themeOption.value}>
                <Check className="h-4 w-4" />
              </Show>
            </DropdownMenuItem>
          )}
        </For>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
