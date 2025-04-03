import { flexRender, type Column, type HeaderContext, type HeaderGroup } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '../table';
import { IvyIcons } from '@axonivy/ui-icons';
import { expandButton, resizer, resizerLine, sortButton, sortHead } from './header.css';
import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';

const ColumnResizer = <TData,>({ header }: { header: HeaderContext<TData, unknown> }) => {
  return (
    <Flex
      justifyContent='center'
      onMouseDown={header.header.getResizeHandler()}
      onTouchStart={header.header.getResizeHandler()}
      className={resizer}
      data-resize-state={header.column.getIsResizing() ? 'active' : 'inactive'}
    >
      <div className={resizerLine} />
    </Flex>
  );
};

type TableResizableHeaderProps<TData> = React.HTMLAttributes<HTMLTableRowElement> & {
  headerGroups: Array<HeaderGroup<TData>>;
};

const TableResizableHeader = <TData,>({ headerGroups, ...props }: TableResizableHeaderProps<TData>) => (
  <TableHeader>
    {headerGroups.map(headerGroup => (
      <TableRow key={headerGroup.id} onDoubleClick={() => headerGroup.headers.forEach(header => header.column.resetSize())} {...props}>
        {headerGroup.headers.map((header, index) => (
          <TableHead key={header.id} colSpan={header.colSpan} style={{ width: header.getSize() }}>
            <Flex direction='row' justifyContent='space-between' alignItems='center' gap={2}>
              {flexRender(header.column.columnDef.header, header.getContext())}
              {headerGroup.headers.length !== index + 1 && <ColumnResizer header={header.getContext()} />}
            </Flex>
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
);
TableResizableHeader.displayName = 'TableResizableHeader';

type SortableHeaderProps<TData> = { column: Column<TData, unknown>; name: string };

const SortableHeader = <TData,>({ column, name }: SortableHeaderProps<TData>) => (
  <Flex direction='row' justifyContent='space-between' alignItems='center' className={sortHead}>
    <span>{name}</span>
    <Button
      className={sortButton}
      aria-label={`Sort by ${name}`}
      onClick={column.getToggleSortingHandler()}
      data-sort-state={column.getIsSorted()}
      icon={column.getIsSorted() ? IvyIcons.Chevron : IvyIcons.Straighten}
      rotate={90}
    />
  </Flex>
);
SortableHeader.displayName = 'SortableHeader';

type ExpandableHeaderProps<TData> = {
  header: HeaderContext<TData, string>;
  name: string;
};

const ExpandableHeader = <TData,>({ header, name }: ExpandableHeaderProps<TData>) => (
  <Flex direction='row' alignItems='center' gap={1}>
    <Button
      icon={IvyIcons.Chevron}
      className={expandButton}
      aria-label={header.table.getIsAllRowsExpanded() ? 'Collapse tree' : 'Expand tree'}
      data-state={header.table.getIsAllRowsExpanded() ? 'expanded' : 'collapsed'}
      onClick={header.table.getToggleAllRowsExpandedHandler()}
    />
    <span>{name}</span>
  </Flex>
);
ExpandableHeader.displayName = 'ExpandableHeader';

export { TableResizableHeader, SortableHeader, ExpandableHeader };
