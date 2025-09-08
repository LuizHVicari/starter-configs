'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const client = new QueryClient();

interface Properties
  extends Omit<React.ComponentProps<typeof QueryClientProvider>, 'children' | 'client'> {
  children: React.ReactNode;
}

export function QueryProvider({ children, ...properties }: Properties): React.JSX.Element {
  return (
    <QueryClientProvider client={client} {...properties}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
