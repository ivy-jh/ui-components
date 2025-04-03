import type { Meta, StoryObj } from '@storybook/react';
import { flexRender, type ColumnDef, useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../table';
import { tableData, type Payment } from '../data';
import { useTableSelect } from '../hooks/hooks';
import { SelectRow } from '../row/row';
import { TableAddRow } from './footer';
import * as React from 'react';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';
import { BasicField } from '@/components/common/field/field';
import { deleteAllSelectedRows } from '@/utils/table/table';

interface TableStoryProps {
  enableMultiselect: boolean;
}

const meta: Meta<TableStoryProps> = {
  title: 'Common/Table/Footer',
  component: AddRemoveTableDemo,
  argTypes: {
    enableMultiselect: {
      control: 'boolean',
      description: 'Toggle for enabling or disabling multi-select'
    }
  },
  args: {
    enableMultiselect: false
  }
};

export default meta;

type Story = StoryObj<TableStoryProps>;

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

function AddRemoveTableDemo({ enableMultiselect }: { enableMultiselect: boolean }) {
  const [data, setData] = React.useState(tableData);

  const addRow = () => {
    const newData = [...data];
    newData.push({ id: 'new', amount: 0, email: '', status: 'pending' });
    setData(newData);
  };

  const removeRow = () => {
    const { newData: newFields } = deleteAllSelectedRows(table, data);
    let newData = structuredClone(data);
    newData = newFields;
    setData(newData);
  };

  const tableSelection = useTableSelect<Payment>();
  const table = useReactTable({
    ...tableSelection.options,
    enableMultiRowSelection: enableMultiselect,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      ...tableSelection.tableState
    }
  });

  return (
    <BasicField
      label='Table'
      control={table.getSelectedRowModel().rows.length > 0 && <Button icon={IvyIcons.Trash} aria-label='Remove row' onClick={removeRow} />}
    >
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
          {table.getRowModel().rows.map(row => (
            <SelectRow key={row.id} row={row}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
        </TableBody>
      </Table>
      <TableAddRow addRow={addRow} />
    </BasicField>
  );
}

export const AddRemove: Story = {
  render: args => <AddRemoveTableDemo enableMultiselect={args.enableMultiselect} />
};
