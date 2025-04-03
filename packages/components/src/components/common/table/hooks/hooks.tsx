import { SearchInput } from '@/components/common/input/input';
import { ROW_VIRTUALIZE_INDEX_ATTRIBUTE } from '@/components/common/table/table';
import { resetAndSetRowSelection, selectRow } from '@/utils/table/table';
import {
  getFilteredRowModel,
  getSortedRowModel,
  type ExpandedState,
  type SortingState,
  type TableOptions,
  type TableState,
  getExpandedRowModel,
  type Row,
  type Table,
  type RowSelectionState,
  type OnChangeFn
} from '@tanstack/react-table';
import * as React from 'react';

type UseTableGlobalFilterRetunValue<TData> = {
  filter: React.ReactNode;
  options: Required<Pick<TableOptions<TData>, 'onGlobalFilterChange' | 'getFilteredRowModel' | 'filterFromLeafRows'>>;
  tableState: Partial<TableState>;
};

type UseTableGlobalFilterOptions = { searchActive?: boolean; searchPlaceholder?: string; searchAutoFocus?: boolean };

export const useTableGlobalFilter = <TData,>(options?: UseTableGlobalFilterOptions): UseTableGlobalFilterRetunValue<TData> => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const searchActive = options?.searchActive === undefined || options?.searchActive;
  return {
    filter: searchActive ? (
      <SearchInput
        placeholder={options?.searchPlaceholder ?? 'Search'}
        value={globalFilter}
        onChange={setGlobalFilter}
        autoFocus={options?.searchAutoFocus}
      />
    ) : null,
    options: { onGlobalFilterChange: setGlobalFilter, getFilteredRowModel: getFilteredRowModel(), filterFromLeafRows: true },
    tableState: { globalFilter }
  };
};

type UseTableSelectRetunValue<TData> = {
  options: Required<
    Pick<TableOptions<TData>, 'onRowSelectionChange' | 'enableRowSelection' | 'enableMultiRowSelection' | 'enableSubRowSelection'>
  >;
  tableState: Partial<TableState>;
};

type TableSelectOptions = {
  initialSelecteState?: RowSelectionState;
  onSelect?: (selectedRows: RowSelectionState) => void;
};

export const useTableSelect = <TData,>(options?: TableSelectOptions): UseTableSelectRetunValue<TData> => {
  const [rowSelection, setRowSelection] = React.useState(options?.initialSelecteState ?? {});
  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = React.useCallback(
    updaterOrValue => {
      setRowSelection(old => {
        const newSelection = typeof updaterOrValue === 'function' ? updaterOrValue(old) : updaterOrValue;
        if (options?.onSelect) {
          options.onSelect(newSelection);
        }
        return newSelection;
      });
    },
    [options]
  );

  return {
    options: {
      onRowSelectionChange: handleRowSelectionChange,
      enableRowSelection: true,
      enableMultiRowSelection: false,
      enableSubRowSelection: false
    },
    tableState: { rowSelection }
  };
};

type UseTableSortRetunValue<TData> = {
  options: Required<Pick<TableOptions<TData>, 'onSortingChange' | 'getSortedRowModel'>>;
  tableState: Partial<TableState>;
};

export const useTableSort = <TData,>(): UseTableSortRetunValue<TData> => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  return {
    options: { onSortingChange: setSorting, getSortedRowModel: getSortedRowModel() },
    tableState: { sorting }
  };
};

type UseTableExpandReturnValue<TData> = {
  options: Required<Pick<TableOptions<TData>, 'onExpandedChange' | 'getSubRows' | 'getExpandedRowModel'>>;
  tableState: Partial<TableState>;
};

export const useTableExpand = <TData extends { children: Array<TData> }>(initState?: ExpandedState): UseTableExpandReturnValue<TData> => {
  const [expanded, setExpanded] = React.useState<ExpandedState>(initState ?? true);
  return {
    options: { onExpandedChange: setExpanded, getSubRows: row => row.children, getExpandedRowModel: getExpandedRowModel() },
    tableState: { expanded }
  };
};

export const useMultiSelectRow = <TData,>(table: Table<TData>) => {
  const [lastSelectedRowId, setLastSelectedRowId] = React.useState<string | null>(null);

  const handleMultiSelectOnRow = (row: Row<TData>, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    const isMultiSelect = event.ctrlKey || event.metaKey;
    const isRangeSelect = event.shiftKey;
    const currentSelection = table.getState().rowSelection;

    if (isRangeSelect && lastSelectedRowId !== null) {
      const allRows = table.getRowModel().rows;
      const lastSelectedRowIndex = allRows.findIndex(r => r.id === lastSelectedRowId);
      const currentRowIndex = allRows.findIndex(r => r.id === row.id);

      if (lastSelectedRowIndex !== -1 && currentRowIndex !== -1) {
        const [start, end] = [lastSelectedRowIndex, currentRowIndex].sort((a, b) => a - b);
        const newSelection = isMultiSelect ? { ...currentSelection } : {};

        for (let i = start; i <= end; i++) {
          newSelection[allRows[i].id] = true;
        }
        table.setRowSelection(newSelection);
      }
    } else if (isMultiSelect) {
      const newSelection = { ...currentSelection, [row.id]: !currentSelection[row.id] };
      table.setRowSelection(newSelection);
      setLastSelectedRowId(row.id);
    } else {
      selectRow(table, row.id);
      setLastSelectedRowId(row.id);
    }
  };

  return { handleMultiSelectOnRow };
};

interface KeyHandlerOptions<TData> {
  multiSelect?: boolean;
  reorder?: { updateOrder?: (moveIndexes: number[], toIndex: number, data: TData[]) => void; getRowId?: (row: TData) => string };
  lazyLoadChildren?: (row: Row<TData>) => void;
  resetSelectionOnTab?: boolean;
  resetSelectionOnEscape?: boolean;
}

interface TableKeyboardHandlerProps<TData> {
  table: Table<TData>;
  data: Array<TData>;
  options?: KeyHandlerOptions<TData>;
}

export const useTableKeyHandler = <TData,>({ table, data, options }: TableKeyboardHandlerProps<TData>) => {
  const [rootIndex, setRootIndex] = React.useState<number | undefined>(undefined);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableElement>, onEnterAction?: (row: Row<TData>) => void) => {
    const actions: Record<string, () => void> = {
      ArrowUp: () => handleArrowKeyUpDown(event, -1),
      ArrowDown: () => handleArrowKeyUpDown(event, 1),
      ArrowLeft: () => toggleExpand(false, table.getSelectedRowModel().flatRows[0], options?.lazyLoadChildren),
      ArrowRight: () => toggleExpand(true, table.getSelectedRowModel().flatRows[0], options?.lazyLoadChildren),
      Tab: () => options?.resetSelectionOnTab && table.resetRowSelection(),
      Enter: () => onEnterAction?.(table.getSelectedRowModel().flatRows[0]),
      Escape: () => options?.resetSelectionOnEscape && table.resetRowSelection()
    };
    const action = actions[event.key];
    if (action) {
      event.stopPropagation();
      action();
    }
  };

  const handleArrowKeyUpDown = (event: React.KeyboardEvent<HTMLTableElement>, direction: -1 | 1) => {
    event.preventDefault();
    const { multiSelect = false, reorder } = options || {};
    const allRows = table.getRowModel().rows;
    const selectedRows = table.getSelectedRowModel().flatRows;

    const newReorderIndex = calculateNewReorderIndex({
      direction,
      firstSelectedRowIndex: allRows.indexOf(selectedRows[0]),
      lastSelectedRowIndex: allRows.indexOf(selectedRows[selectedRows.length - 1]),
      selectedRowsCount: selectedRows.length,
      allRowsCount: allRows.length
    });
    const newSelectIndex = calculateNewSelectIndex(direction, newReorderIndex, allRows.length);
    if (event.altKey && reorder?.updateOrder && reorder.getRowId) {
      const moveIndexes = selectedRows.map(row => row.index);
      const rowId = reorder.getRowId;
      const moveIds = selectedRows.map(row => rowId(row.original));
      reorder.updateOrder(moveIndexes, newReorderIndex, data);
      resetAndSetRowSelection(table, data, moveIds, reorder.getRowId);
      setRootIndex(newReorderIndex);
    } else if (event.shiftKey && multiSelect) {
      toggleMultiRowSelection(direction, newSelectIndex, allRows, selectedRows);
    } else {
      table.resetRowSelection();
      allRows[newReorderIndex].toggleSelected();
      setRootIndex(newReorderIndex);
      scrollToNextRow(event, newReorderIndex);
    }
  };

  const toggleMultiRowSelection = <TData,>(
    direction: -1 | 1,
    newIndex: number | undefined,
    allRows: Array<Row<TData>>,
    selectedRows: Array<Row<TData>>
  ): void => {
    if (newIndex === undefined) {
      return;
    }
    if (rootIndex === undefined && selectedRows.length === 1) {
      setRootIndex(selectedRows[0].index);
    }
    if (direction === 1) {
      if (rootIndex === allRows.indexOf(selectedRows[0]) || selectedRows.length === 1) {
        allRows[newIndex].toggleSelected();
      } else {
        selectedRows[0].toggleSelected();
      }
    } else {
      if (rootIndex === allRows.indexOf(selectedRows[selectedRows.length - 1]) || selectedRows.length === 1) {
        allRows[newIndex].toggleSelected();
      } else {
        selectedRows[selectedRows.length - 1].toggleSelected();
      }
    }
  };

  return { handleKeyDown };
};

const scrollToNextRow = (event: React.KeyboardEvent<HTMLTableElement>, newReorderIndex: number) => {
  let scrollRow = Array.from(event.currentTarget.rows).find(
    row => row.getAttribute(ROW_VIRTUALIZE_INDEX_ATTRIBUTE) === `${newReorderIndex}`
  );
  if (!scrollRow) {
    scrollRow = event.currentTarget.rows[newReorderIndex];
  }
  if (scrollRow) {
    scrollRow.scrollIntoView({ block: 'center' });
  } else {
    event.currentTarget.scrollIntoView({ block: 'end' });
  }
};

const toggleExpand = <TData,>(expand: boolean, row?: Row<TData>, loadChildren?: (row: Row<TData>) => void) => {
  if (row === undefined || !row.getCanExpand()) {
    return;
  }
  if (expand && !row.getIsExpanded()) {
    loadChildren?.(row);
    row.toggleExpanded();
  } else if (!expand && row.getIsExpanded()) {
    row.toggleExpanded();
  }
};

interface CalculateNewReorderIndexProps {
  direction: -1 | 1;
  firstSelectedRowIndex: number;
  lastSelectedRowIndex: number;
  selectedRowsCount: number;
  allRowsCount: number;
}
const calculateNewReorderIndex = ({
  direction,
  firstSelectedRowIndex,
  lastSelectedRowIndex,
  selectedRowsCount,
  allRowsCount
}: CalculateNewReorderIndexProps): number => {
  if (selectedRowsCount === 0) {
    return direction === 1 ? 0 : allRowsCount - 1;
  }
  const baseIndex = direction === 1 ? lastSelectedRowIndex : firstSelectedRowIndex;
  return (baseIndex + direction + allRowsCount) % allRowsCount;
};

const calculateNewSelectIndex = (direction: -1 | 1, reorderIndex: number, allRowsCount: number): number | undefined => {
  if ((direction === 1 && reorderIndex === 0) || (direction === -1 && reorderIndex === allRowsCount - 1)) {
    return undefined;
  }
  return reorderIndex;
};
