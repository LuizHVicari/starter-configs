import { cn } from '@/features/common/shared/lib/utilities';

export function VStack({
  className,
  children,
  ...properties
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div className={cn('flex flex-col gap-2', className)} {...properties}>
      {children}
    </div>
  );
}
