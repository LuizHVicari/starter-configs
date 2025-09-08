import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Li({ className, ...properties }: React.ComponentProps<'li'>): React.JSX.Element {
  return <li className={cn('leading-7', className)} {...properties} />;
}
