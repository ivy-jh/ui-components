import { cn } from '@/utils/class-name';
import * as React from 'react';
import { table, root, header, body, cell, footer, head, row } from './table.css';
import { Field } from '@/components/common/field/field';

/**
 * Table, based on {@link https://tanstack.com/table/v8 | Tanstack Table}
 */
const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <Field className={cn(root, 'ui-table-root')}>
    <table ref={ref} className={cn(table, className, 'ui-table')} tabIndex={0} {...props} />
  </Field>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn(header, className, 'ui-table-header')} {...props} />
);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn(body, className, 'ui-table-body')} {...props} />
);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tfoot ref={ref} className={cn(footer, className, 'ui-table-footer')} {...props} />
);
TableFooter.displayName = 'TableFooter';

export const ROW_VIRTUALIZE_INDEX_ATTRIBUTE = 'data-vindex';

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  vindex?: number | string;
};

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(({ className, vindex, ...props }, ref) => (
  <tr ref={ref} className={cn(row, className, 'ui-table-row')} {...{ [ROW_VIRTUALIZE_INDEX_ATTRIBUTE]: vindex }} {...props} />
));
TableRow.displayName = 'TableRow';

// eslint-disable-next-line react/prop-types
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn(head, className, 'ui-table-head')} {...props} />
));
TableHead.displayName = 'TableHead';

// eslint-disable-next-line react/prop-types
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn(cell, className, 'ui-table-cell')} {...props} />
));
TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell };
