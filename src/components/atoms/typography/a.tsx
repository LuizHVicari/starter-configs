import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

interface AProperties extends React.ComponentProps<'a'> {
  children: React.ReactNode;
}

export function A({ className, children, ...properties }: AProperties): React.JSX.Element {
  return (
    <a className={cn('font-medium underline underline-offset-4', className)} {...properties}>
      {children}
    </a>
  );
}
