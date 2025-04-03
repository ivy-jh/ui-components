import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnDef } from '@tanstack/react-table';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { tableData, type Payment } from '../data';
import { MessageRow, SelectRow } from '../row/row';
import { useTableSelect } from '../hooks/hooks';
import { ComboCell, InputCell, SelectCell } from './edit';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Edit',
  component: Table
};

type Story = StoryObj<typeof Table>;

export default meta;

const columns: ColumnDef<Payment, string>[] = [
  {
    accessorKey: 'status',
    header: () => <span>Select</span>,
    cell: cell => (
      <SelectCell
        cell={cell}
        items={[
          { value: 'pending', label: 'Pending' },
          { value: 'processing', label: 'Processing' },
          { value: 'success', label: 'Success' },
          { value: 'failed', label: 'Failed' }
        ]}
        placeholder={'Select a state'}
        disabled={cell.row.original.id === 'INV006'}
      />
    )
  },
  {
    accessorKey: 'email',
    header: () => <span>Input</span>,
    cell: cell => <InputCell cell={cell} placeholder='Enter an email address' disabled={cell.row.original.id === 'INV006'} />
  },
  {
    accessorKey: 'amount',
    header: () => <span>Combobox</span>,
    cell: cell => (
      <ComboCell
        cell={cell}
        options={[{ value: '123' }, { value: '456' }, { value: '789' }]}
        placeholder='Enter amount'
        disabled={cell.row.original.id === 'INV006'}
      />
    )
  }
];

function EditTableDemo() {
  const [data, setData] = React.useState(tableData);

  const tableSelection = useTableSelect<Payment>();
  const table = useReactTable({
    ...tableSelection.options,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      ...tableSelection.tableState
    },
    meta: {
      updateData: (rowId, columnId, value) => {
        setData(old => {
          const newData = old.map((row, index) => {
            const rowIndex = parseInt(rowId);
            if (index === rowIndex) {
              return { ...data[rowIndex], [columnId]: value };
            }
            return row;
          });
          console.log('data changed: ', newData);
          return newData;
        });
      }
    }
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} onClick={() => tableSelection.options.onRowSelectionChange({})}>
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
          <React.Fragment key={row.id}>
            <SelectRow row={row}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
            <MessageRow
              message={index === 2 ? { message: 'This is an error', variant: 'error' } : undefined}
              columnCount={columns.length}
            />
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

export const Default: Story = {
  render: () => <EditTableDemo />
};
