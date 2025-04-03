import * as React from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

import { cn } from '@/utils/class-name';
import { toggleGroup } from './toggleGroup.css';

type ToggleGroupProps = React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
  gap?: 1 | 2 | 3 | 4 | undefined;
};

/**
 * ToggleGroup, based on {@link https://www.radix-ui.com/docs/primitives/components/toggle-group | Radix UI ToggleGroup}
 */
const ToggleGroup = React.forwardRef<React.ElementRef<typeof ToggleGroupPrimitive.Root>, ToggleGroupProps>(
  ({ className, gap, ...props }, ref) => (
    <ToggleGroupPrimitive.Root className={cn(toggleGroup({ gap }), className, 'ui-toggle-group')} {...props} ref={ref} />
  )
);
ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => <ToggleGroupPrimitive.Item ref={ref} className={cn(className, 'ui-toggle-group-item')} {...props} />);
ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
