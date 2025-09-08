import React from 'react';

interface Properties {
  children: React.ReactNode;
  when: unknown;
  fallback?: React.ReactNode;
}

export function Show({ children, when, fallback }: Properties): React.JSX.Element {
  return when ? <>{children}</> : <>{fallback}</>;
}
