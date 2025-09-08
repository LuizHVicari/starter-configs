import React from 'react';

import { VStack } from '@/components/atoms';
import { ThemeToggler } from '@/components/molecules/controls/theme-toggler';

export default function Home(): React.JSX.Element {
  return (
    <main>
      <VStack>
        <ThemeToggler />
      </VStack>
    </main>
  );
}
