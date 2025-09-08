import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

export function Ul({ className, ...properties }: React.ComponentProps<'ul'>): React.JSX.Element {
  return <ul className={cn('list-disc pl-6', className)} {...properties} />;
}
