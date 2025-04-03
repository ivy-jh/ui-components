import * as React from 'react';
import { IvyIcons } from '@axonivy/ui-icons';
import { panel, panelIcon, panelMessage } from './panelMessage.css';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { Message } from '@/components/common/message/message';

type PanelMessageProps = {
  mode?: 'column' | 'row';
  icon?: IvyIcons;
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

const PanelMessage = React.forwardRef<HTMLDivElement, PanelMessageProps>(
  ({ message, mode = 'column', icon = IvyIcons.DragDrop, ...props }, ref) => (
    <Flex justifyContent='center' alignItems='center' direction={mode} className={panel} ref={ref} {...props}>
      <IvyIcon icon={icon} className={panelIcon({ mode })} />
      <Message className={panelMessage}>{message}</Message>
    </Flex>
  )
);
PanelMessage.displayName = 'PanelMessage';

export { PanelMessage };
