import { Show } from '@/components/atoms';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/features/common/shared/lib/utilities';

interface Properties extends React.ComponentProps<typeof DialogTrigger> {
  trigger: React.ReactNode;
  modalClassName?: string;
  title?: string;
  description?: string;
}

export function LargeModal({
  children,
  modalClassName,
  description,
  title,
  trigger,
  ...properties
}: Properties): React.JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild {...properties}>
        {trigger}
      </DialogTrigger>
      <DialogPortal>
        <DialogContent
          className={cn(
            'w-full max-w-none max-h-none sm:w-3xl sm:max-w-none overflow-hidden flex flex-col p-3',
            modalClassName || 'h-full md:h-auto',
          )}
        >
          <Show when={title}>
            <DialogTitle>{title}</DialogTitle>
          </Show>
          <Show when={description}>
            <DialogDescription>{description}</DialogDescription>
          </Show>
          <div>{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
