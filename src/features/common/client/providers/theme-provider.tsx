'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createContext, useContext, useEffect, useState } from 'react';

type ColorTheme = 'default' | 'purple' | 'green' | 'blue' | 'orange';

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export function useColorTheme(): ColorThemeContextType {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
}

interface ColorThemeProviderProperties {
  children: React.ReactNode;
}

function ColorThemeProvider({ children }: ColorThemeProviderProperties): React.JSX.Element {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('default');

  useEffect(() => {
    const stored = localStorage.getItem('color-theme') as ColorTheme;
    if (stored && ['default', 'purple', 'green', 'blue', 'orange'].includes(stored)) {
      setColorThemeState(stored);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    // Remove all theme classes
    root.classList.remove('theme-purple', 'theme-green', 'theme-blue', 'theme-orange');

    // Add the current theme class (except for default)
    if (colorTheme !== 'default') {
      root.classList.add(`theme-${colorTheme}`);
    }

    // Store the theme
    localStorage.setItem('color-theme', colorTheme);
  }, [colorTheme]);

  const setColorTheme = (theme: ColorTheme): void => {
    setColorThemeState(theme);
  };

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function ThemeProvider({
  children,
  ...properties
}: React.ComponentProps<typeof NextThemesProvider>): React.JSX.Element {
  return (
    <NextThemesProvider {...properties}>
      <ColorThemeProvider>{children}</ColorThemeProvider>
    </NextThemesProvider>
  );
}
