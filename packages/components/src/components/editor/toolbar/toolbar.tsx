import * as React from 'react';
import { toolbar, toolbarContainer, toolbarHeader, toolbarTitle, type ToolbarContainerVariants } from './toolbar.css';
import { cn } from '@/utils/class-name';

const Toolbar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn(toolbar, className)} ref={ref} {...props}>
      <div className={cn(toolbarHeader)}>{children}</div>
    </div>
  );
});
Toolbar.displayName = 'Toolbar';

const ToolbarTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  return (
    <div className={cn(toolbarTitle, className)} ref={ref} {...props}>
      {children}
    </div>
  );
});
ToolbarTitle.displayName = 'ToolbarTitle';

const ToolbarContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ToolbarContainerVariants>(
  ({ maxWidth, minWidth, className, children, ...props }, ref) => {
    return (
      <div className={cn(toolbarContainer({ maxWidth, minWidth }), className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
ToolbarContainer.displayName = 'ToolbarContainer';

export { Toolbar, ToolbarTitle, ToolbarContainer };
