import React from 'react';

import { DialogTrigger } from '@/components/ui/dialog';

import { LargeModal } from './large-modal';

interface Properties extends Omit<React.ComponentProps<typeof DialogTrigger>, 'children'> {
  trigger: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  modalClassName?: string;
  title?: string;
  description?: string;
}

export function ModalPreview({
  trigger,
  modalClassName,
  ...properties
}: Properties): React.JSX.Element {
  const triggerElementWithHover = React.cloneElement(trigger, {
    className: `${trigger.props.className} hover:cursor-pointer`,
  });

  return (
    <LargeModal modalClassName={modalClassName} trigger={triggerElementWithHover} {...properties}>
      {trigger}
    </LargeModal>
  );
}
