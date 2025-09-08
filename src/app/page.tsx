import React from 'react';

import { DemoScreen } from '@/features/demo/client/components/screens/demo-screen';

export default async function Home(): Promise<React.JSX.Element> {
  return (
    <main>
      <DemoScreen />
    </main>
  );
}
