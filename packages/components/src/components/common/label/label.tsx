import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/utils/class-name';
import { useField } from '@/components/common/field/field';

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
  ({ className, ...props }, ref) => {
    const { labelProps } = useField();
    return <LabelPrimitive.Root ref={ref} className={cn(className, 'ui-label')} {...labelProps} {...props} />;
  }
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
