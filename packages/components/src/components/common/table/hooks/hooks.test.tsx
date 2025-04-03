import { useMultiSelectRow, useTableGlobalFilter } from '@/components/common/table/hooks/hooks';
import { setupTable } from '@/utils/table/test-utils/setup';
import { act } from 'react';
import { cleanup, render, renderHook, screen } from 'test-utils';

const TableSearch = ({ options }: { options?: Parameters<typeof useTableGlobalFilter>[0] }) => {
  const globalFilter = useTableGlobalFilter(options);
  return <>{globalFilter.filter}</>;
};

describe('useTableGlobalFilter', () => {
  test('no options', async () => {
    const { result } = renderHook(() => useTableGlobalFilter());
    expect(result.current.filter).not.toBeNull();
    expect(result.current.tableState.globalFilter).toEqual('');
    expect(result.current.options.filterFromLeafRows).toBeTruthy();
  });

  test('option active', async () => {
    const { result: active } = renderHook(() => useTableGlobalFilter({ searchActive: true }));
    expect(active.current.filter).not.toBeNull();
    const { result: inactive } = renderHook(() => useTableGlobalFilter({ searchActive: false }));
    expect(inactive.current.filter).toBeNull();
  });

  test('option autofocus', async () => {
    render(<TableSearch />);
    expect(screen.getByRole('textbox')).not.toHaveFocus();
    cleanup();
    render(<TableSearch options={{ searchAutoFocus: true }} />);
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  test('option placeholder', async () => {
    const view = render(<TableSearch />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Search');
    view.rerender(<TableSearch options={{ searchPlaceholder: 'blabla' }} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'blabla');
  });

  test('selectOne', async () => {
    setupTable();
    const { result } = renderHook(() => useTableGlobalFilter());
    expect(result.current.filter).not.toBeNull();
    expect(result.current.tableState.globalFilter).toEqual('');
    expect(result.current.options.filterFromLeafRows).toBeTruthy();
  });
});

describe('handleMultiSelectOnRowClick', () => {
  test('ctrl+click selects/deselects row', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const { result } = renderHook(() => useMultiSelectRow(table));
    const row = table.getRowModel().rows[1];
    const event = { ctrlKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;

    act(() => result.current.handleMultiSelectOnRow(row, event));
    expect(onRowSelectionChangeValues).toEqual([{ '1': true }]);
    table.getState().rowSelection = { '1': true };
    act(() => result.current.handleMultiSelectOnRow(row, event));
    expect(onRowSelectionChangeValues).toEqual([{ '1': true }, { '1': false }]);
  });

  test('shift+click selects a range of rows', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const { result } = renderHook(() => useMultiSelectRow(table));
    const rows = table.getRowModel().rows;
    const event = { shiftKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(rows[0], event));
    act(() => result.current.handleMultiSelectOnRow(rows[2], event));
    expect(onRowSelectionChangeValues[1]).toEqual({ '0': true, '1': true, '2': true });
  });

  test('shift+click deselect a range of rows', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const { result } = renderHook(() => useMultiSelectRow(table));
    const rows = table.getRowModel().rows;
    const event = { shiftKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(rows[0], event));
    act(() => result.current.handleMultiSelectOnRow(rows[3], event));
    act(() => result.current.handleMultiSelectOnRow(rows[2], event));
    expect(onRowSelectionChangeValues[2]).toEqual({ '0': true, '1': true, '2': true });
  });

  test('ctrl+shift+click adds a range to the existing selection', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const { result } = renderHook(() => useMultiSelectRow(table));
    const rows = table.getRowModel().rows;
    const ctrlEvent = { ctrlKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    const ctrlShiftEvent = { shiftKey: true, ctrlKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(rows[0], ctrlEvent));
    table.getState().rowSelection = { '0': true };
    act(() => result.current.handleMultiSelectOnRow(rows[2], ctrlEvent));
    expect(onRowSelectionChangeValues[1]).toEqual({ '0': true, '2': true });
    table.getState().rowSelection = { '0': true, '2': true };
    act(() => result.current.handleMultiSelectOnRow(rows[4], ctrlShiftEvent));
    expect(onRowSelectionChangeValues[2]).toEqual({ '0': true, '2': true, '3': true, '4': true });
  });

  test('ctrl+shift+click on selected row does nothing', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const { result } = renderHook(() => useMultiSelectRow(table));
    const rows = table.getRowModel().rows;
    const event = { shiftKey: true, ctrlKey: true } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(rows[3], event));
    table.getState().rowSelection = { '3': true };
    act(() => result.current.handleMultiSelectOnRow(rows[3], event));
    expect(onRowSelectionChangeValues[1]).toEqual({ '3': true });
  });

  test('non-ctrl click selects single row', () => {
    const { table, onRowSelectionChangeValues } = setupTable();
    const { result } = renderHook(() => useMultiSelectRow(table));
    const row = table.getRowModel().rows[1];
    const event = { ctrlKey: false } as React.MouseEvent<HTMLTableRowElement, MouseEvent>;
    act(() => result.current.handleMultiSelectOnRow(row, event));
    expect(onRowSelectionChangeValues).toEqual([{ '1': true }]);
  });
});
