import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function P({
  className,
  children,
  ...properties
}: React.ComponentProps<'p'> & { children: React.ReactNode }): React.JSX.Element {
  return (
    <p className={cn('leading-7', className)} {...properties}>
      {children}
    </p>
  );
}
