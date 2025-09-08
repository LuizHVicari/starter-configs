import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function H2({
  className,
  children,
  ...properties
}: React.ComponentProps<'h2'> & { children: React.ReactNode }): React.JSX.Element {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...properties}
    >
      {children}
    </h2>
  );
}
