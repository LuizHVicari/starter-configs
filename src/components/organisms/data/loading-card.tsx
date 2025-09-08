import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingCard({
  className,
  ...properties
}: React.ComponentProps<typeof Card>): React.JSX.Element {
  return (
    <Card className={className} {...properties}>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-4" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-24" />
      </CardContent>
    </Card>
  );
}
