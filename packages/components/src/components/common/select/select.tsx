import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { content, item, itemIcon, label, scrollButton, seperator, trigger, triggerIcon, viewport } from './select.css';
import { useField } from '@/components/common/field/field';
import { IvyIcon } from '@/components/common/icon/icon';
import { useReadonly } from '@/context/useReadonly';

/**
 * Select, based on {@link https://www.radix-ui.com/docs/primitives/components/select | Radix UI Select}
 * Also see {@link BasicSelect}
 */
const Select = ({ disabled, ...props }: SelectPrimitive.SelectProps) => {
  const readonly = useReadonly();
  return <SelectPrimitive.Root disabled={readonly || disabled} {...props} />;
};
Select.displayName = SelectPrimitive.Root.displayName;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { inputProps } = useField();
  return (
    <SelectPrimitive.Trigger ref={ref} className={cn(trigger, className, 'ui-select-trigger')} {...inputProps} {...props}>
      {children}
      <SelectPrimitive.Icon asChild>
        <IvyIcon icon={IvyIcons.Chevron} rotate={90} className={triggerIcon} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} className={cn(scrollButton, className)} {...props}>
    <IvyIcon icon={IvyIcons.Chevron} rotate={270} />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} className={cn(scrollButton, className)} {...props}>
    <IvyIcon icon={IvyIcons.Chevron} rotate={90} />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(content, className, 'ui-select-content')}
      position={position}
      sideOffset={sideOffset}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport className={cn(viewport)}>{children}</SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => <SelectPrimitive.Label ref={ref} className={cn(label, className, 'ui-select-label')} {...props} />);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cn(item, className, 'ui-select-item')} {...props}>
    <SelectPrimitive.ItemIndicator className={itemIcon}>
      <IvyIcon icon={IvyIcons.Check} />
    </SelectPrimitive.ItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn(seperator, className, 'ui-select-separator')} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export type BasicSelectProps = SelectPrimitive.SelectProps &
  Pick<SelectPrimitive.SelectValueProps, 'placeholder' | 'tabIndex' | 'onKeyDown'> & {
    items: ReadonlyArray<{ value: string; label: string }>;
    emptyItem?: boolean;
    className?: string;
  };

const BasicSelect = ({
  items,
  emptyItem,
  className,
  placeholder,
  value,
  onValueChange,
  defaultValue,
  onKeyDown,
  ...props
}: BasicSelectProps) => {
  const unknownValue = React.useMemo(() => {
    if (defaultValue && items.find(item => item.value === defaultValue) === undefined) {
      return defaultValue;
    }
    if (value && items.find(item => item.value === value) === undefined) {
      return value;
    }
    return undefined;
  }, [defaultValue, items, value]);
  const onInternalValueChange = (value: string) => {
    if (value === ' ') {
      value = '';
    }
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <Select value={value} onValueChange={onInternalValueChange} defaultValue={defaultValue} {...props}>
      <SelectTrigger className={className} onKeyDown={onKeyDown}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {emptyItem && value && <SelectItem value=' '></SelectItem>}
          {unknownValue && <SelectItem value={unknownValue}>{unknownValue}</SelectItem>}
          {items.map(item => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
BasicSelect.displayName = 'BasicSelect';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  BasicSelect
};
