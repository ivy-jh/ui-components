import * as React from 'react';

import { IvyIcons } from '@axonivy/ui-icons';
import { useCombobox } from 'downshift';
import { cn } from '@/utils/class-name';
import { content, item as itemClass } from './combobox.css';
import { Button } from '@/components/common/button/button';
import { useField } from '@/components/common/field/field';
import { Flex } from '@/components/common/flex/flex';
import { InputGroup, Input } from '@/components/common/input/input';
import { useReadonly } from '@/context/useReadonly';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/common/popover/popover';

export type ComboboxOption = {
  value: string;
};

export type ComboboxProps<T extends ComboboxOption> = Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'onChange' | 'onKeyDown'> & {
  value: string;
  onChange: (change: string) => void;
  options: T[];
  optionFilter?: (item: T, input?: string) => boolean;
  itemRender?: (item: T) => React.ReactNode;
  onKeyDownExtended?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const defaultFilter = (option: ComboboxOption, input?: string): boolean => {
  if (!input) {
    return true;
  }
  const filter = input.toLowerCase();
  return option.value.toLowerCase().includes(filter);
};

/**
 * Combobox, based on {@link https://www.downshift-js.com/use-combobox | Downshift JS useCombobox}
 */
const Combobox = <T extends ComboboxOption>({
  value,
  onChange,
  options,
  optionFilter = defaultFilter,
  itemRender = option => <span>{option.value}</span>,
  disabled,
  className,
  onKeyDownExtended,
  ...props
}: ComboboxProps<T>) => {
  const [filteredItems, setFilteredItems] = React.useState(options);
  React.useEffect(() => setFilteredItems(options), [options]);

  const { inputProps } = useField();

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    openMenu,
    highlightedIndex,
    setHighlightedIndex,
    getItemProps,
    selectedItem,
    selectItem
  } = useCombobox({
    inputId: inputProps.id,
    labelId: inputProps['aria-labelledby'],
    onSelectedItemChange(change) {
      setFilteredItems(options);
      if (change.inputValue !== value) {
        onChange(change.inputValue ?? '');
      }
    },
    stateReducer(state, actionAndChanges) {
      switch (actionAndChanges.type) {
        case useCombobox.stateChangeTypes.InputBlur:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          selectItem({ value: actionAndChanges.changes.inputValue ?? '' });
      }
      return actionAndChanges.changes;
    },

    onInputValueChange(change) {
      if (change.type !== useCombobox.stateChangeTypes.FunctionSelectItem) {
        setFilteredItems(options.filter(option => optionFilter(option, change.inputValue)));
      }
    },
    items: filteredItems,
    itemToString(item) {
      return item?.value ?? '';
    },
    initialSelectedItem: { value }
  });

  React.useEffect(() => {
    selectItem({ value });
    setFilteredItems(options);
  }, [options, selectItem, value]);

  const readonly = useReadonly();
  return (
    <Popover open={isOpen}>
      <div className='ui-combobox'>
        <PopoverAnchor asChild>
          <InputGroup className={className}>
            <Input
              {...getInputProps({
                onKeyDown: e => {
                  if (e.key === 'Enter') {
                    if (!isOpen) {
                      openMenu();
                      setHighlightedIndex(0);
                      return;
                    }
                  }
                  onKeyDownExtended?.(e);
                }
              })}
              className={className}
              {...props}
              disabled={readonly || disabled}
            />
            <Button
              {...getToggleButtonProps()}
              icon={IvyIcons.Chevron}
              rotate={90}
              aria-label='toggle menu'
              disabled={readonly || disabled}
              type='button'
            />
          </InputGroup>
        </PopoverAnchor>
        <div {...getMenuProps()}>
          <PopoverContent onOpenAutoFocus={e => e.preventDefault()} className={cn(content, 'ui-combobox-menu')}>
            {filteredItems.map((item, index) => (
              <Flex
                gap={2}
                className={cn(itemClass, 'ui-combobox-item')}
                data-highlighted={highlightedIndex === index ? '' : undefined}
                data-state={selectedItem?.value === item.value ? 'checked' : 'unchecked'}
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                {itemRender(item)}
              </Flex>
            ))}
          </PopoverContent>
        </div>
      </div>
    </Popover>
  );
};
Combobox.displayName = 'Combobox';

export { Combobox };
