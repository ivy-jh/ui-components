import * as React from 'react';
import type { IvyIcons } from '@axonivy/ui-icons';
import { cn } from '@/utils/class-name';

export type IvyIconProps = {
  icon: IvyIcons;
  rotate?: 45 | 90 | 180 | 270;
  spin?: boolean;
};

interface IconProps extends IvyIconProps, React.ButtonHTMLAttributes<HTMLElement> {}

const IvyIcon = React.forwardRef<HTMLElement, IconProps>(({ icon, rotate, spin, className, ...props }, ref) => (
  <i className={cn('ivy', `ivy-${icon}`, rotate && `ivy-rotate-${rotate}`, spin && 'ivy-spin', className)} {...props} ref={ref} />
));

export { IvyIcon };
