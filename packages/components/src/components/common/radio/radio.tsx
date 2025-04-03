import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/utils/class-name';
import { radioGroup, radioGroupIdicator, radioGroupItem } from './radio.css';
import { useField } from '@/components/common/field/field';
import { useReadonly } from '@/context/useReadonly';

/**
 * RadioGroup, based on {@link https://www.radix-ui.com/docs/primitives/components/radio-group | Radix UI RadioGroup}
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ disabled, className, ...props }, ref) => {
  const readonly = useReadonly();
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroup, className, 'ui-radio-group')}
      disabled={readonly || disabled}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { inputProps } = useField();
  return (
    <RadioGroupPrimitive.Item ref={ref} className={cn(radioGroupItem, className, 'ui-radio-group-item')} {...inputProps} {...props}>
      <RadioGroupPrimitive.Indicator className={cn(radioGroupIdicator)} />
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
