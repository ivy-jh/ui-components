import type { Meta, StoryObj } from '@storybook/react';
import { flexRender, type ColumnDef, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { MessageRow, ReorderRow, ReorderHandleWrapper, SelectRow } from './row';
import { useMultiSelectRow, useTableKeyHandler, useTableSelect } from '../hooks/hooks';
import { Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { tableData, type Payment } from '../data';
import { arraymove, arrayMoveMultiple, indexOf } from '@/utils/array';
import { resetAndSetRowSelection } from '@/utils/table/table';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Row',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: () => <span>Status</span>,
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
    minSize: 50
  },
  {
    accessorKey: 'email',
    header: () => <span>Email</span>,
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'amount',
    header: () => <span>Amount</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);

      return <div>{formatted}</div>;
    }
  }
];

export const Select: StoryObj<{ enableMultiRowSelection: boolean }> = {
  args: {
    enableMultiRowSelection: false
  },
  render: ({ enableMultiRowSelection }) => {
    const [payment, setPayment] = React.useState<Payment | null>();
    const rowSelection = useTableSelect<Payment>({
      onSelect: selectedRows => {
        const selectedRowId = Object.keys(selectedRows).find(key => selectedRows[key]);
        const selectedPayment = table.getRowModel().flatRows.find(row => row.id === selectedRowId)?.original;
        setPayment(selectedPayment || null);
      }
    });
    const table = useReactTable({
      ...rowSelection.options,
      enableMultiRowSelection,
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...rowSelection.tableState
      }
    });

    const { handleKeyDown } = useTableKeyHandler({ table, data: tableData });

    return (
      <>
        <Table onKeyDown={handleKeyDown}>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} onClick={() => rowSelection.options.onRowSelectionChange({})}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <SelectRow key={row.id} row={row} onDoubleClick={() => alert(`Double click on row: ${row.id}`)}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </SelectRow>
            ))}
          </TableBody>
        </Table>
        <div title='selected-row'>Selected Row: {payment ? payment.email : ''}</div>
      </>
    );
  }
};

export const Message: Story = {
  render: () => {
    const table = useReactTable({
      data: tableData,
      columns,
      getCoreRowModel: getCoreRowModel()
    });
    return (
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row, index) => (
            <Fragment key={row.id}>
              {/* TODO: change row border color to message variant color */}
              <TableRow>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
              <MessageRow
                message={index === 2 ? { message: 'This is an error', variant: 'error' } : undefined}
                columnCount={columns.length}
              />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export const Reorder: Story = {
  render: () => {
    const [data, setData] = React.useState(tableData);
    const updateDataArray = (fromIndex: number[], toIndex: number, data: Payment[]) => {
      arraymove(data, fromIndex[0], toIndex);
      setData([...data]);
    };
    const updateOrder = (moveId: string, targetId: string) => {
      const fromIndex = indexOf(data, obj => obj.id === moveId);
      const toIndex = indexOf(data, obj => obj.id === targetId);
      updateDataArray([fromIndex], toIndex, data);
    };
    const reorderColumns: ColumnDef<Payment>[] = [
      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
        minSize: 50
      },
      {
        accessorKey: 'email',
        header: () => <span>Email</span>,
        cell: ({ row }) => (
          <ReorderHandleWrapper>
            <div>{row.getValue('email')}</div>
          </ReorderHandleWrapper>
        )
      }
    ];
    const rowSelection = useTableSelect<Payment>();
    const table = useReactTable({
      ...rowSelection.options,
      data,
      columns: reorderColumns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...rowSelection.tableState
      }
    });
    const { handleKeyDown } = useTableKeyHandler({
      table,
      data,
      options: { reorder: { updateOrder: updateDataArray, getRowId: row => row.id } }
    });

    return (
      <Table onKeyDown={handleKeyDown}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <ReorderRow key={row.id} row={row} id={row.original.id} updateOrder={updateOrder}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} onClick={() => table.options.meta?.updateData(row.id, cell.column.id, cell.getValue() + '1')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </ReorderRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};

export const MultiSelectWithReorder: Story = {
  render: () => {
    const [data, setData] = React.useState(tableData);

    const reorderColumns: ColumnDef<Payment>[] = [
      {
        accessorKey: 'status',
        header: () => <span>Status</span>,
        cell: ({ row }) => <div>{row.getValue('status')}</div>,
        minSize: 50
      },
      {
        accessorKey: 'email',
        header: () => <span>Email</span>,
        cell: ({ row }) => (
          <ReorderHandleWrapper>
            <div>{row.getValue('email')}</div>
          </ReorderHandleWrapper>
        )
      }
    ];
    const rowSelection = useTableSelect<Payment>();
    const table = useReactTable({
      ...rowSelection.options,
      enableMultiRowSelection: true,
      data,
      columns: reorderColumns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...rowSelection.tableState
      }
    });
    const { handleMultiSelectOnRow } = useMultiSelectRow(table);
    const updateDataArray = (moveIndexes: number[], toIndex: number, data: Payment[]) => {
      arrayMoveMultiple(data, moveIndexes, toIndex);
      setData([...data]);
    };
    const updateOrder = (moveId: string, targetId: string) => {
      const selectedRows = table.getSelectedRowModel().flatRows.map(r => r.original.id);
      const moveIds = selectedRows.length > 1 ? selectedRows : [moveId];
      const moveIndexes = moveIds.map(moveId => indexOf(data, obj => obj.id === moveId));
      const toIndex = indexOf(data, obj => obj.id === targetId);
      const newData = structuredClone(data);
      updateDataArray(moveIndexes, toIndex, newData);
      resetAndSetRowSelection(table, newData, moveIds, row => row.id);
    };
    const { handleKeyDown } = useTableKeyHandler({
      table,
      data,
      options: {
        multiSelect: true,
        reorder: { updateOrder: updateDataArray, getRowId: row => row.id },
        resetSelectionOnTab: true,
        resetSelectionOnEscape: true
      }
    });

    return (
      <Table onKeyDown={handleKeyDown}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <ReorderRow
              key={row.id}
              row={row}
              id={row.original.id}
              updateOrder={updateOrder}
              onDrag={!row.getIsSelected() ? () => table.resetRowSelection() : undefined}
              onClick={event => handleMultiSelectOnRow(row, event)}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} onClick={() => table.options.meta?.updateData(row.id, cell.column.id, cell.getValue() + '1')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </ReorderRow>
          ))}
        </TableBody>
      </Table>
    );
  }
};
