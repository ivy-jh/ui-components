import type { Meta, StoryObj } from '@storybook/react';
import { flexRender, type ColumnDef, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableRow } from '../table';
import { SortableHeader, TableResizableHeader } from './header';
import { useTableGlobalFilter, useTableSort } from '../hooks/hooks';
import { tableData, type Payment } from '../data';
import { Flex } from '@/components/common/flex/flex';
import { MessageRow } from '@/components/common/table/row/row';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Header',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} name='Status' />,
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
    minSize: 50
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <SortableHeader column={column} name='Email' />,
    cell: ({ row }) => <div>{row.getValue('email')}</div>
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <SortableHeader column={column} name='Amount' />,
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

function DataTableDemo() {
  const globalFilter = useTableGlobalFilter();
  const sorting = useTableSort();

  const table = useReactTable({
    ...globalFilter.options,
    ...sorting.options,
    data: tableData,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    state: {
      ...globalFilter.tableState,
      ...sorting.tableState
    }
  });

  return (
    <Flex direction='column' gap={1}>
      {globalFilter.filter}
      <Table>
        <TableResizableHeader headerGroups={table.getHeaderGroups()} />
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <MessageRow message={{ message: 'No results', variant: 'info' }} columnCount={columns.length} />
          )}
        </TableBody>
      </Table>
    </Flex>
  );
}

export const FilterResizeSortTable: Story = {
  render: () => <DataTableDemo />
};
