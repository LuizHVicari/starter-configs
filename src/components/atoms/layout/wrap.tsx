import { cn } from '@/features/common/shared/lib/utilities';

export function Wrap({
  className,
  children,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div className={cn('flex flex-wrap', className)} {...properties}>
      {children}
    </div>
  );
}
