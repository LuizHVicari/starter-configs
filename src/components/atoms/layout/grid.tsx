import * as React from 'react';

import { cn } from '@/features/common/shared/lib/utilities';

function Grid({ className, ...properties }: React.ComponentProps<'div'>): React.JSX.Element {
  return <div className={cn('grid', className)} data-slot="grid" {...properties} />;
}

function GridContainer({
  className,
  ...properties
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      className={cn('mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8', className)}
      data-slot="grid-container"
      {...properties}
    />
  );
}

function GridRow({ className, ...properties }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      className={cn('grid grid-cols-12 gap-4 lg:gap-6', className)}
      data-slot="grid-row"
      {...properties}
    />
  );
}

function GridCol({
  className,
  span = 'auto',
  ...properties
}: React.ComponentProps<'div'> & {
  span?: 'auto' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'full';
}): React.JSX.Element {
  const spanClasses = {
    auto: 'col-auto',
    '1': 'col-span-1',
    '2': 'col-span-2',
    '3': 'col-span-3',
    '4': 'col-span-4',
    '5': 'col-span-5',
    '6': 'col-span-6',
    '7': 'col-span-7',
    '8': 'col-span-8',
    '9': 'col-span-9',
    '10': 'col-span-10',
    '11': 'col-span-11',
    '12': 'col-span-12',
    full: 'col-span-full',
  };

  return <div className={cn(spanClasses[span], className)} data-slot="grid-col" {...properties} />;
}

function GridItem({ className, ...properties }: React.ComponentProps<'div'>): React.JSX.Element {
  return <div className={cn('flex flex-col', className)} data-slot="grid-item" {...properties} />;
}

export { Grid, GridCol, GridContainer, GridItem, GridRow };
