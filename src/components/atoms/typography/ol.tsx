import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Ol({ className, ...properties }: React.ComponentProps<'ol'>): React.JSX.Element {
  return <ol className={cn('list-decimal pl-6', className)} {...properties} />;
}
