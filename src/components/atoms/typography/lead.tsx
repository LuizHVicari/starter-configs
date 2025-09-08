import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Lead({ className, ...properties }: React.ComponentProps<'p'>): React.JSX.Element {
  return <p className={cn('text-xl text-muted-foreground', className)} {...properties} />;
}
