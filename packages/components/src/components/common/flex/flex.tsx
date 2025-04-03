import * as React from 'react';
import { cn } from '@/utils/class-name';
import type { FlexVariants } from './flex.css';
import { flex } from './flex.css';

const Flex = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & FlexVariants>(
  ({ direction, gap, alignItems, justifyContent, className, children, ...props }, ref) => {
    return (
      <div className={cn(flex({ direction, gap, alignItems, justifyContent }), className, 'ui-flex')} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
Flex.displayName = 'Flex';

export { Flex };
