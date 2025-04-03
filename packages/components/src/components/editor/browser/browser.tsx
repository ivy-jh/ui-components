import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type ExpandedState,
  type Row,
  type RowSelectionState
} from '@tanstack/react-table';
import type { IvyIcons } from '@axonivy/ui-icons';
import { fullHeight, info, overflowAuto, overflowHidden } from './browser.css';
import { ExpandableCell } from '@/components/common/table/tree/tree';
import { Button } from '@/components/common/button/button';
import { BasicCollapsible } from '@/components/common/collapsible/collapsible';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { SearchInput } from '@/components/common/input/input';
import { useTableExpand, useTableKeyHandler, useTableSelect } from '@/components/common/table/hooks/hooks';
import { MessageRow, SelectRow } from '@/components/common/table/row/row';
import { Table, TableBody, TableCell, TableRow } from '@/components/common/table/table';
import { cn } from '@/utils/class-name';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/common/tabs/tabs';

export type BrowserNode<TData = unknown> = {
  value: string;
  info: string;
  icon: IvyIcons;
  children: Array<BrowserNode<TData>>;
  data?: TData;
  notSelectable?: boolean;
  isLoaded?: boolean;
};

export const useBrowser = (
  data: Array<BrowserNode>,
  options?: {
    loadChildren?: (row: Row<BrowserNode>) => void;
    initialSearch?: string;
    expandedState?: ExpandedState;
    initialSelecteState?: RowSelectionState;
  }
) => {
  const columns: ColumnDef<BrowserNode, string>[] = [
    {
      accessorKey: 'value',
      cell: cell => (
        <ExpandableCell
          cell={cell}
          icon={cell.row.original.icon}
          lazy={
            cell.row.original.isLoaded !== undefined && options?.loadChildren !== undefined
              ? { isLoaded: cell.row.original.isLoaded, loadChildren: options.loadChildren }
              : undefined
          }
        >
          <span>{cell.getValue()}</span>
          <span className={info}>{cell.row.original.info}</span>
        </ExpandableCell>
      )
    }
  ];

  const [filter, setFilter] = React.useState(options?.initialSearch ?? '');
  const expanded = useTableExpand<BrowserNode>(options?.expandedState ? options.expandedState : { '0': true });
  const select = useTableSelect<BrowserNode>({ initialSelecteState: options?.initialSelecteState });
  const table = useReactTable({
    ...expanded.options,
    ...select.options,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setFilter,
    getFilteredRowModel: getFilteredRowModel(),
    filterFromLeafRows: true,
    state: {
      globalFilter: filter,
      ...expanded.tableState,
      ...select.tableState
    }
  });
  const { handleKeyDown } = useTableKeyHandler({ table, data, options: { lazyLoadChildren: options?.loadChildren } });
  return { table, globalFilter: { filter, setFilter }, handleKeyDown };
};

export type BrowserResult<TData = unknown> = {
  value: string;
  data?: TData;
  firstLine?: string;
};

export type Browser = {
  name: string;
  icon: IvyIcons;
  browser: ReturnType<typeof useBrowser> | React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  emptyMessage?: string;
  infoProvider?: (row?: Row<BrowserNode>) => React.ReactNode;
  applyModifier?: (row?: Row<BrowserNode>) => BrowserResult;
};

export type BrowsersViewProps = {
  browsers: Array<Browser>;
  apply: (browserName: string, result?: BrowserResult) => void;
  /** @deprecated use options instead */
  applyBtn?: { label?: string; icon?: IvyIcons };
  options?: {
    applyBtn?: { label?: string; icon?: IvyIcons };
    search?: { placeholder?: string };
    info?: { label?: string };
    cancelBtn?: { label?: string };
  };
};

function isUseBrowserResult(browser: Browser['browser']): browser is ReturnType<typeof useBrowser> {
  return (browser as ReturnType<typeof useBrowser>).table !== undefined;
}

const BrowsersView = ({ browsers, apply, applyBtn, options }: BrowsersViewProps) => {
  const applyButton = applyBtn ?? options?.applyBtn;
  const [tab, setTab] = React.useState(browsers[0].name);
  const selectedRow = () => {
    const browser = browsers.find(b => b.name === tab)?.browser;
    if (browser && isUseBrowserResult(browser)) {
      const table = browser.table;
      if (table) {
        return table.getRowModel().rowsById[Object.keys(table.getState().rowSelection)[0]];
      }
    }
    return;
  };
  const infoProvider = (row?: Row<BrowserNode>) => {
    const info = browsers.find(b => b.name === tab)?.infoProvider;
    if (info) {
      return info(row);
    }
    return row?.original.value;
  };
  const applyHandler = (doubleClickRow?: Row<BrowserNode>) => {
    const browser = browsers.find(b => b.name === tab);
    if (!browser) {
      return;
    }
    const row = doubleClickRow ?? selectedRow();
    if (!row) {
      if (browser.applyModifier !== undefined) {
        apply(browser.name, browser.applyModifier());
        return;
      }
      return;
    }
    const value = row.original.value;
    const data = row.original.data;
    let result: BrowserResult = { value, data };
    if (browser.applyModifier !== undefined) {
      result = browser.applyModifier(row);
    }
    apply(browser.name, result);
  };
  return (
    <Tabs value={tab} onValueChange={setTab} className={cn(fullHeight, overflowHidden)}>
      <Flex direction='column' gap={1} className={fullHeight}>
        <TabsList>
          {browsers.map(browser => (
            <TabsTrigger key={browser.name} value={browser.name}>
              <IvyIcon icon={browser.icon} />
              {browser.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <Flex direction='column' gap={1} justifyContent='space-between' className={cn(fullHeight, overflowAuto)}>
          {browsers.map(({ name, header, footer, emptyMessage, browser }) => (
            <TabsContent key={name} value={name} asChild>
              <Flex direction='column' gap={1} className={cn(fullHeight, overflowAuto)}>
                {header}
                {isUseBrowserResult(browser) ? (
                  <>
                    <SearchInput
                      placeholder={options?.search?.placeholder ?? 'Search'}
                      autoFocus={true}
                      value={browser.globalFilter.filter}
                      onChange={browser.globalFilter.setFilter}
                    />
                    <div className={overflowAuto}>
                      <Table onKeyDown={e => browser.handleKeyDown(e, applyHandler)}>
                        <TableBody>
                          {browser.table.getRowModel().rows?.length ? (
                            browser.table.getRowModel().rows.map(row => (
                              <React.Fragment key={row.id}>
                                {row.original.notSelectable ? (
                                  <TableRow>
                                    {row.getVisibleCells().map(cell => (
                                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                  </TableRow>
                                ) : (
                                  <SelectRow row={row} onDoubleClick={() => applyHandler(row)}>
                                    {row.getVisibleCells().map(cell => (
                                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                  </SelectRow>
                                )}
                              </React.Fragment>
                            ))
                          ) : (
                            <MessageRow message={{ message: emptyMessage ?? 'No results', variant: 'info' }} columnCount={1} />
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                ) : (
                  browser
                )}
                {footer}
              </Flex>
            </TabsContent>
          ))}
          <BasicCollapsible label={options?.info?.label ?? 'Info'} style={{ maxHeight: 50 }}>
            {infoProvider(selectedRow())}
          </BasicCollapsible>
          <Flex direction='row' justifyContent='flex-end' gap={1}>
            <Button aria-label={options?.cancelBtn?.label ?? 'Cancel'} onClick={() => apply(tab)} size='large'>
              {options?.cancelBtn?.label ?? 'Cancel'}
            </Button>
            <Button
              aria-label={applyButton?.label ?? 'Apply'}
              icon={applyButton?.icon}
              onClick={() => applyHandler()}
              size='large'
              variant='primary'
            >
              {applyButton?.label ?? 'Apply'}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Tabs>
  );
};
BrowsersView.displayName = 'BrowsersView';

export { BrowsersView };
