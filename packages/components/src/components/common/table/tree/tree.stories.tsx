import type { Meta, StoryObj } from '@storybook/react';
import { flexRender, type ColumnDef, useReactTable, getCoreRowModel, type Row, type Table as ReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableRow } from '../table';
import { ExpandableCell } from './tree';
import { treeData, type Variable } from './data';
import { IvyIcons } from '@axonivy/ui-icons';
import { useState } from 'react';
import { ExpandableHeader, TableResizableHeader } from '@/components/common/table/header/header';
import { useTableExpand, useTableGlobalFilter, useTableKeyHandler, useTableSelect } from '@/components/common/table/hooks/hooks';
import { Flex } from '@/components/common/flex/flex';
import { SelectRow } from '@/components/common/table/row/row';

const meta: Meta<typeof Table> = {
  title: 'Common/Table/Tree',
  component: Table
};

export default meta;

type Story = StoryObj<typeof Table>;

const TreeTableDemo = ({ table }: { table: ReactTable<Variable> }) => (
  <Table>
    <TableResizableHeader headerGroups={table.getHeaderGroups()} />
    <TableBody>
      {table.getRowModel().rows.map(row => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map(cell => (
            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const Default: Story = {
  render: () => {
    const columns: ColumnDef<Variable, string>[] = [
      {
        accessorKey: 'name',
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => <ExpandableCell cell={cell} icon={IvyIcons.User} />,
        minSize: 50
      },
      {
        accessorKey: 'value',
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      }
    ];
    const expanded = useTableExpand<Variable>();
    const table = useReactTable({
      ...expanded.options,
      data: treeData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...expanded.tableState
      }
    });
    return <TreeTableDemo table={table} />;
  }
};

export const CustomValue: Story = {
  render: () => {
    const columns: ColumnDef<Variable, string>[] = [
      {
        accessorKey: 'name',
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => (
          <ExpandableCell cell={cell} icon={IvyIcons.User}>
            <>
              <span style={{ textDecoration: 'line-through' }}>{cell.getValue()}</span>
              <span style={{ color: 'gray' }}>More info</span>
            </>
          </ExpandableCell>
        ),
        minSize: 50
      },
      {
        accessorKey: 'value',
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      }
    ];

    const expanded = useTableExpand<Variable>();
    const table = useReactTable({
      ...expanded.options,
      data: treeData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...expanded.tableState
      }
    });
    return <TreeTableDemo table={table} />;
  }
};

export const Lazy: Story = {
  render: () => {
    const [data, setData] = useState<Array<Variable>>([
      ...treeData,
      {
        name: 'click to load more',
        value: '',
        isLoaded: false,
        children: []
      }
    ]);

    const loadChildrenFor = (tree: Array<Variable>): Array<Variable> => {
      return tree.map(node => {
        // in real impl you need to search for the node which should be loaded!
        if (node.isLoaded === false) {
          node.children = [{ name: 'load more', value: '', isLoaded: false, children: [] }];
          node.isLoaded = true;
        } else {
          loadChildrenFor(node.children);
        }
        return node;
      });
    };

    const loadLazy = (row: Row<Variable>) => {
      setData(old => loadChildrenFor(old));
      console.log('lazy laod on row', row.id);
    };

    const columns: ColumnDef<Variable, string>[] = [
      {
        accessorKey: 'name',
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => (
          <ExpandableCell
            cell={cell}
            icon={IvyIcons.User}
            lazy={{ isLoaded: cell.row.original.isLoaded ?? true, loadChildren: loadLazy }}
          />
        ),
        minSize: 50
      },
      {
        accessorKey: 'value',
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      }
    ];

    const expanded = useTableExpand<Variable>();
    const table = useReactTable({
      ...expanded.options,
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...expanded.tableState
      }
    });
    return <TreeTableDemo table={table} />;
  }
};

export const Search: Story = {
  render: () => {
    const columns: ColumnDef<Variable, string>[] = [
      {
        accessorKey: 'name',
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => <ExpandableCell cell={cell} icon={IvyIcons.User} />,
        minSize: 50
      },
      {
        accessorKey: 'value',
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      }
    ];

    const expanded = useTableExpand<Variable>();
    const globalFilter = useTableGlobalFilter<Variable>();
    const table = useReactTable({
      ...expanded.options,
      ...globalFilter.options,
      data: treeData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...expanded.tableState,
        ...globalFilter.tableState
      }
    });

    return (
      <Flex direction='column' gap={1}>
        {globalFilter.filter}
        <TreeTableDemo table={table} />
      </Flex>
    );
  }
};

export const Select: Story = {
  render: () => {
    const columns: ColumnDef<Variable, string>[] = [
      {
        accessorKey: 'name',
        header: header => <ExpandableHeader name='Expand' header={header} />,
        cell: cell => <ExpandableCell cell={cell} icon={IvyIcons.User} />,
        minSize: 50
      },
      {
        accessorKey: 'value',
        header: () => <span>Value</span>,
        cell: cell => <div>{cell.getValue()}</div>
      }
    ];

    const expanded = useTableExpand<Variable>();
    const globalFilter = useTableGlobalFilter<Variable>();
    const rowSelection = useTableSelect<Variable>();
    const table = useReactTable({
      ...rowSelection.options,
      ...expanded.options,
      ...globalFilter.options,
      data: treeData,
      columns,
      getCoreRowModel: getCoreRowModel(),
      state: {
        ...expanded.tableState,
        ...globalFilter.tableState,
        ...rowSelection.tableState
      }
    });
    const { handleKeyDown } = useTableKeyHandler({ table, data: treeData });

    return (
      <Flex direction='column' gap={1}>
        {globalFilter.filter}
        <Table onKeyDown={handleKeyDown}>
          <TableResizableHeader headerGroups={table.getHeaderGroups()} />
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
      </Flex>
    );
  }
};
