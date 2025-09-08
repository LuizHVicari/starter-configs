import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function H4({
  className,
  children,
  ...properties
}: React.ComponentProps<'h4'> & { children: React.ReactNode }): React.JSX.Element {
  return (
    <h4
      className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)}
      {...properties}
    >
      {children}
    </h4>
  );
}
