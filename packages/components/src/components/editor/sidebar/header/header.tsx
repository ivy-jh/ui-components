import * as React from 'react';
import { header, headerIcon, headerLeft, headerMessage, headerTitle } from './header.css';
import { cn } from '@/utils/class-name';
import type { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: IvyIcons;
  title: string;
};

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(({ icon, title, className, children, ...props }, ref) => (
  <Flex gap={2} alignItems='center' justifyContent='space-between' className={cn(header, className)} ref={ref} {...props}>
    <Flex className={headerLeft} gap={3} alignItems='center'>
      {icon && <IvyIcon icon={icon} className={headerIcon} />}
      <div className={headerTitle}>{title}</div>
    </Flex>
    {children}
  </Flex>
));
SidebarHeader.displayName = 'SidebarHeader';

const SidebarMessages = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Flex>>(({ className, ...props }, ref) => (
  <Flex className={cn(headerMessage, className)} direction='column' gap={1} ref={ref} {...props} />
));
SidebarMessages.displayName = 'SidebarMessages';

export { SidebarHeader, SidebarMessages };
