import { cn } from '@/features/common/shared/lib/utilities';

interface Properties extends React.HTMLAttributes<HTMLDivElement> {
  innerClassName?: string;
}

export function LimitedPage({
  children,
  className,
  innerClassName,
  ...properties
}: Properties): React.JSX.Element {
  return (
    <div
      className={cn('flex flex-col w-full justify-start items-center', className)}
      {...properties}
    >
      <div className={cn('w-full max-w-7xl', innerClassName)}>{children}</div>
    </div>
  );
}
