import { outlineContainer } from './outline.css';
import { cn } from '@/utils/class-name';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { useTableExpand, useTableGlobalFilter, useTableSelect } from '@/components/common/table/hooks/hooks';
import { ExpandableCell } from '@/components/common/table/tree/tree';
import { Table, TableBody, TableCell } from '@/components/common/table/table';
import { SelectRow } from '@/components/common/table/row/row';
import type { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components/common/flex/flex';
import { vars } from '@/styles/theme.css';
import { useEffect } from 'react';

export type OutlineNode = {
  id: string;
  title: string;
  info?: string;
  icon?: IvyIcons;
  children: Array<OutlineNode>;
};

export type OutlineProps = {
  outline: Array<OutlineNode>;
  selection?: string;
  onClick?: (id: string) => void;
  onDoubleClick?: () => void;
  options?: { searchPlaceholder?: string };
};

const Outline = ({ outline, selection, onClick, onDoubleClick, options }: OutlineProps) => {
  const globalFilter = useTableGlobalFilter({ searchAutoFocus: true, searchPlaceholder: options?.searchPlaceholder });
  const expanded = useTableExpand<OutlineNode>();
  const select = useTableSelect<OutlineNode>();
  const columns: ColumnDef<OutlineNode, string>[] = [
    {
      accessorKey: 'title',
      cell: cell => (
        <ExpandableCell cell={cell} icon={cell.row.original.icon}>
          <>
            <span>{cell.getValue()}</span>
            <span style={{ color: vars.color.n500 }}>{cell.row.original.info}</span>
          </>
        </ExpandableCell>
      )
    }
  ];
  const table = useReactTable({
    ...expanded.options,
    ...globalFilter.options,
    ...select.options,
    data: outline,
    columns,
    getCoreRowModel: getCoreRowModel(),
    globalFilterFn: ({ original }, _, filter) =>
      original.title.toLowerCase().includes(filter.toLowerCase()) ||
      (original.info?.toLowerCase().includes(filter.toLowerCase()) as boolean),
    state: {
      ...expanded.tableState,
      ...globalFilter.tableState,
      ...select.tableState
    }
  });
  useEffect(() => {
    if (selection) {
      const rowId = table.getRowModel().flatRows.find(row => row.original.id === selection)?.id;
      if (!rowId) return;
      table.setRowSelection({ [rowId]: true });
    }
  }, [selection, table]);
  return (
    <Flex direction='column' gap={4} className={cn(outlineContainer, 'ui-outline')}>
      {globalFilter.filter}
      <Table>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <SelectRow
              key={row.original.id}
              row={row}
              onClick={() => onClick && onClick(row.original.id)}
              onDoubleClick={() => onDoubleClick && onDoubleClick()}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </SelectRow>
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
};
Outline.displayName = 'Outline';

export { Outline };
