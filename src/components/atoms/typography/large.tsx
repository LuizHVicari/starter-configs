import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Large({
  className,
  children,
  ...properties
}: React.ComponentProps<'div'> & { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className={cn('text-lg font-semibold', className)} {...properties}>
      {children}
    </div>
  );
}
