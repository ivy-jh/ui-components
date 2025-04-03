import type { Row } from '@tanstack/react-table';
import * as React from 'react';
import { dndRow, reorderHandle, reorderHandleIcon, selectedRow } from './row.css';
import { cn } from '@/utils/class-name';
import { IvyIcons } from '@axonivy/ui-icons';
import { useDrag, useDrop, type TextDropItem } from '@react-aria/dnd';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { type MessageData, Message } from '@/components/common/message/message';
import { TableRow, TableCell } from '@/components/common/table/table';

type SelectRowProps<TData> = React.ComponentProps<typeof TableRow> & {
  row: Row<TData>;
};

const SelectRow = <TData,>({ row, className, onClick, ...props }: SelectRowProps<TData>) => {
  const selectRow = () => {
    if (row.getCanMultiSelect() || !row.getIsSelected()) {
      row.toggleSelected();
    }
  };
  return (
    <TableRow
      className={cn(selectedRow, className, 'ui-select-row')}
      data-state={row.getIsSelected() ? 'selected' : 'unselected'}
      onClick={event => {
        if (event.detail === 1) {
          selectRow();
        }
        if (onClick) {
          onClick(event);
        }
      }}
      onFocus={() => selectRow()}
      {...props}
    />
  );
};
SelectRow.displayName = 'SelectRow';

type MessageRowProps = React.ComponentProps<typeof TableRow> & { message?: MessageData; columnCount: number };

const MessageRow = ({ message, className, columnCount, ...props }: MessageRowProps) => {
  if (message === undefined) {
    return null;
  }
  return (
    <TableRow className={cn(className, 'ui-message-row')} {...props}>
      <TableCell colSpan={columnCount}>
        <Message message={message.message} variant={message.variant} />
      </TableCell>
    </TableRow>
  );
};
MessageRow.displayName = 'MessageRow';

export type ReorderRowProps<TData> = SelectRowProps<TData> & {
  id: string;
  updateOrder: (moveId: string, targetId: string) => void;
};

const ReorderRow = <TData,>({ id, updateOrder, row, className, ...props }: ReorderRowProps<TData>) => {
  const DND_TYPE = 'text/id';

  const { dragProps, isDragging } = useDrag({
    getItems() {
      return [{ 'text/id': id }];
    }
  });

  const ref = React.useRef(null);
  const { dropProps, isDropTarget } = useDrop({
    ref,
    getDropOperation(types) {
      return types.has(DND_TYPE) ? 'move' : 'cancel';
    },
    async onDrop(e) {
      const dndItems = e.items.filter(item => item.kind === 'text' && item.types.has(DND_TYPE));
      if (dndItems.length === 1) {
        const item = await (dndItems[0] as TextDropItem).getText(DND_TYPE);
        updateOrder(item, id);
      }
      if (!row.getIsSelected()) {
        row.getToggleSelectedHandler()(e);
      }
    }
  });

  return (
    <SelectRow
      {...dragProps}
      {...dropProps}
      row={row}
      data-drag-state={isDragging}
      data-drop-target-state={isDropTarget}
      className={cn(dndRow, className, 'ui-dnd-row')}
      {...props}
    />
  );
};
ReorderRow.displayName = 'ReorderRow';

const ReorderHandleWrapper = ({ children, className }: React.HTMLAttributes<HTMLTableCellElement>) => (
  <Flex direction='row' alignItems='center' gap={3} className={cn(reorderHandle, 'ui-dnd-row-handle', className)}>
    {children}
    <IvyIcon icon={IvyIcons.EditDots} className={cn(reorderHandleIcon, 'ui-dnd-row-handleicon')} />
  </Flex>
);
ReorderHandleWrapper.displayName = 'ReorderHandleWrapper';

export { SelectRow, MessageRow, ReorderRow, ReorderHandleWrapper };
