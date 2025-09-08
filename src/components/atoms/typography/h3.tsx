import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function H3({
  className,
  children,
  ...properties
}: React.ComponentProps<'h3'> & { children: React.ReactNode }): React.JSX.Element {
  return (
    <h3
      className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)}
      {...properties}
    >
      {children}
    </h3>
  );
}
