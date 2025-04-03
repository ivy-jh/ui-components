import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { resizableHandle, resizableLine } from './resizable.css';
import { IvyIcon } from '@/components/common/icon/icon';

/**
 * ResizablePanelGroup, based on {@link https://github.com/bvaughn/react-resizable-panels | React Resizable Panels}
 */
const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup className={cn(className, 'ui-resizable')} {...props} />
);

const ResizablePanel = ResizablePrimitive.Panel;

export type ResizableHandleProps = React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
};

const ResizableHandle = ({ withHandle, className, ...props }: ResizableHandleProps) => (
  <ResizablePrimitive.PanelResizeHandle className={cn(resizableLine, className, 'ui-resizable-handle')} {...props}>
    {withHandle && (
      <div className={resizableHandle}>
        <IvyIcon icon={IvyIcons.EditDots} />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
);

export type ImperativePanelHandle = ResizablePrimitive.ImperativePanelHandle;

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
