import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './table';
import { tableData } from './data';

const meta: Meta<typeof Table> = {
  title: 'Common/Table',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead style={{ width: 100 }}>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead style={{ textAlign: 'right' }}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map(row => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell style={{ textAlign: 'right' }}>{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell style={{ textAlign: 'right' }}>$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
};
