import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Pre({ className, ...properties }: React.ComponentProps<'pre'>): React.JSX.Element {
  return (
    <pre
      className={cn('overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm', className)}
      {...properties}
    />
  );
}
