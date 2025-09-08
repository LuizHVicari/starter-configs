import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Blockquote({
  className,
  children,
  ...properties
}: React.ComponentProps<'blockquote'> & { children: React.ReactNode }): React.JSX.Element {
  return (
    <blockquote className={cn('border-l-2 pl-6 italic', className)} {...properties}>
      {children}
    </blockquote>
  );
}
