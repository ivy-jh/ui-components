import type { CellContext, RowData } from '@tanstack/react-table';
import * as React from 'react';
import { editCell } from './edit.css';
import { cn } from '@/utils/class-name';
import { Input, type InputProps } from '@/components/common/input/input';
import { type ComboboxOption, type ComboboxProps, Combobox } from '@/components/common/combobox/combobox';
import { type BasicSelectProps, BasicSelect } from '@/components/common/select/select';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    updateData: (rowId: string, columnId: string, value: string) => void;
  }
}

export const useEditCell = <TData,>(cell: CellContext<TData, string>) => {
  const initialValue = cell.getValue();
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const updateValue = (value: string) => {
    setValue(value);
    cell.table.options.meta?.updateData(cell.row.id, cell.column.id, value);
  };
  const onBlur = () => updateValue(value);
  return { value, setValue, updateValue, onBlur, className: cn(editCell, 'ui-table-edit-cell') };
};

type InputCellProps<TData> = InputProps & {
  cell: CellContext<TData, string>;
};

const InputCell = <TData,>({ cell, className, ...props }: InputCellProps<TData>) => {
  const { value, setValue, onBlur, className: editCell } = useEditCell(cell);
  return (
    <Input
      value={value}
      onChange={e => setValue(e.target.value)}
      onBlur={onBlur}
      className={cn(editCell, className)}
      onKeyDown={e => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectNextPreviousCell(e.currentTarget as HTMLInputElement, cell, 1);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectNextPreviousCell(e.currentTarget as HTMLInputElement, cell, -1);
        }
      }}
      {...props}
    />
  );
};
InputCell.displayName = 'InputCell';

type SelectCellProps<TData> = BasicSelectProps & {
  cell: CellContext<TData, string>;
};

const SelectCell = <TData,>({ cell, className, ...props }: SelectCellProps<TData>) => {
  const { value, updateValue, className: editCell } = useEditCell(cell);
  const [open, setOpen] = React.useState(false);
  return (
    <BasicSelect
      value={value}
      onValueChange={updateValue}
      className={cn(editCell, className)}
      onKeyDown={e => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectNextPreviousCell(e.currentTarget as HTMLButtonElement, cell, 1);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectNextPreviousCell(e.currentTarget as HTMLButtonElement, cell, -1);
        }
        if (e.key === 'Enter') {
          setOpen(old => !old);
        }
      }}
      onOpenChange={setOpen}
      open={open}
      {...props}
    />
  );
};
SelectCell.displayName = 'SelectCell';

type ComboCellProps<TData, TCombo extends ComboboxOption> = Omit<ComboboxProps<TCombo>, 'value' | 'onChange'> & {
  cell: CellContext<TData, string>;
};

const ComboCell = <TData, TCombo extends ComboboxOption>({ cell, className, ...props }: ComboCellProps<TData, TCombo>) => {
  const { value, updateValue, className: editCell } = useEditCell(cell);
  return (
    <Combobox
      {...props}
      value={value}
      onChange={updateValue}
      className={cn(editCell, className)}
      onKeyDownExtended={e => {
        if (e.key === 'ArrowDown' && !document.querySelector('.ui-combobox-menu')) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (e.nativeEvent as any).preventDownshiftDefault = true;
          selectNextPreviousCell(e.currentTarget as HTMLInputElement, cell, 1);
        }
        if (e.key === 'ArrowUp' && !document.querySelector('.ui-combobox-menu')) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (e.nativeEvent as any).preventDownshiftDefault = true;
          selectNextPreviousCell(e.currentTarget as HTMLInputElement, cell, -1);
        }
      }}
    />
  );
};
ComboCell.displayName = 'ComboCell';

export { InputCell, SelectCell, ComboCell };

export const selectNextPreviousCell = <TData,>(
  htmlElement: HTMLButtonElement | HTMLInputElement | Element,
  cell: CellContext<TData, unknown>,
  direction: -1 | 1
) => {
  const focusedCell = htmlElement.closest('td');
  if (focusedCell && focusedCell instanceof HTMLTableCellElement) {
    const cellIndex = cell.column.getIndex();
    const allRows = cell.table.getRowModel().flatRows;
    const rowIndex = allRows.findIndex(row => row.id === cell.row.id) + 1;
    const focusNextCell = (nextRowIndex: number, cellIndex: number) => {
      const table = focusedCell?.closest('table');
      if (!table) return;
      const validRows = Array.from(table.rows).filter(row => !row.classList.contains('ui-message-row'));
      const hasHeaderRow = validRows.some(row => !row.classList.contains('ui-select-row'));
      const hiddenRows = allRows.length - validRows.length + (hasHeaderRow ? 1 : 0);
      const rowIndex = nextRowIndex - (hasHeaderRow ? 0 : 1) - hiddenRows;
      const nextRow = validRows[rowIndex];
      if (!nextRow) return;

      const nextCell = nextRow.cells[cellIndex];
      if (nextCell) {
        let nextElement;
        if (htmlElement instanceof HTMLButtonElement) {
          nextElement = nextCell.querySelector('button');
        } else {
          nextElement = nextCell.querySelector('input');
        }

        if (nextElement && !nextElement.hasAttribute('disabled')) {
          nextElement.focus();
        } else {
          focusNextCell(nextRowIndex + direction, cellIndex);
        }
      }
    };
    focusNextCell(rowIndex + direction, cellIndex);
  }
};
