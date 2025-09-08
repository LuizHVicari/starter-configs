import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Code({
  className,
  children,
  ...properties
}: React.ComponentProps<'code'> & { children: React.ReactNode }): React.JSX.Element {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
      {...properties}
    >
      {children}
    </code>
  );
}
