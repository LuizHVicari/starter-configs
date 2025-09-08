import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Small({
  className,
  ...properties
}: React.ComponentProps<'small'>): React.JSX.Element {
  return <small className={cn('text-sm font-medium leading-none', className)} {...properties} />;
}
