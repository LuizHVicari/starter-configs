import { getTranslations } from 'next-intl/server';
import React from 'react';

import { H1, VStack } from '@/components/atoms';
import { LanguageToggle, ThemeToggler } from '@/components/molecules/controls';

export default async function Home(): Promise<React.JSX.Element> {
  const t = await getTranslations();

  return (
    <main>
      <VStack>
        <ThemeToggler />
        <LanguageToggle />
        <H1>{t('app.name')}</H1>
      </VStack>
    </main>
  );
}
