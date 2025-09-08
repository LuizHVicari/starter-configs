import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function H1({
  className,
  children,
  ...properties
}: React.ComponentProps<'h1'> & { children: React.ReactNode }): React.JSX.Element {
  return (
    <h1
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
      {...properties}
    >
      {children}
    </h1>
  );
}
