import React from 'react';

interface Properties<T> {
  each: T[];
  children: (value: T, index: number) => React.JSX.Element;
  fallback?: React.JSX.Element;
}

export function For<T>({ each, children, fallback }: Properties<T>): React.JSX.Element {
  if (each.length === 0) {
    return <>{fallback}</>;
  }

  return <>{each.map((value, index) => children(value, index))}</>;
}
