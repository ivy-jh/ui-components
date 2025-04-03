import * as React from 'react';

import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { message as messageClass, type MessageVariants } from './message.css';
import { IvyIcon } from '@/components/common/icon/icon';
import { useField } from '@/components/common/field/field';

const ivyIconForSeverity = (variant: NonNullable<MessageVariants>['variant']) => {
  switch (variant) {
    case 'info':
      return IvyIcons.InfoCircle;
    case 'warning':
      return IvyIcons.Caution;
    case 'error':
      return IvyIcons.ErrorXMark;
  }
  return undefined;
};
export type MessageData = MessageVariants & { message?: string };

export type MessageProps = React.HTMLAttributes<HTMLParagraphElement> & MessageData;

const Message = React.forwardRef<HTMLParagraphElement, MessageProps>(({ message, variant, className, children, ...props }, ref) => {
  const { messageProps } = useField();
  const body = message ? message : children;
  const icon = ivyIconForSeverity(variant);
  return (
    <p
      ref={ref}
      className={cn(messageClass({ variant }), className, 'ui-message')}
      title={message}
      data-state={variant}
      {...messageProps}
      {...props}
    >
      {icon && <IvyIcon icon={icon} />}
      {body}
    </p>
  );
});
Message.displayName = 'Message';

export { Message };
