import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Muted({ className, ...properties }: React.ComponentProps<'p'>): React.JSX.Element {
  return <p className={cn('text-sm text-muted-foreground', className)} {...properties} />;
}
