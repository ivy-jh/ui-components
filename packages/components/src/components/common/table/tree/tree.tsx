import type * as React from 'react';
import { IvyIcons } from '@axonivy/ui-icons';
import type { CellContext, Row } from '@tanstack/react-table';
import { cellIcon, expandButton, expandCell, indent } from './tree.css';
import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';

type LazyExpand<TData> = { isLoaded: boolean; loadChildren: (row: Row<TData>) => void };

type ExpandableCellProps<TData> = {
  cell: CellContext<TData, string>;
  icon?: IvyIcons;
  lazy?: LazyExpand<TData>;
  children?: React.ReactNode;
};

const expanedButton = <TData,>(row: Row<TData>, lazy?: LazyExpand<TData>) => {
  const expandHandlerProps = (handler: () => void) => ({
    onMouseDown: handler,
    onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') handler();
    }
  });
  if (row.getCanExpand()) {
    return (
      <Button
        icon={IvyIcons.Chevron}
        className={expandButton}
        aria-label={row.getIsExpanded() ? 'Collapse row' : 'Expand row'}
        data-state={row.getIsExpanded() ? 'expanded' : 'collapsed'}
        tabIndex={-1}
        {...expandHandlerProps(row.getToggleExpandedHandler())}
      />
    );
  }
  if (lazy && lazy.isLoaded === false) {
    const loadLazy = () => {
      lazy.loadChildren(row);
      row.toggleExpanded(true);
    };
    return (
      <Button
        icon={IvyIcons.Chevron}
        className={expandButton}
        aria-label='Expand row'
        data-state='collapsed'
        {...expandHandlerProps(loadLazy)}
      />
    );
  }
  return null;
};

const ExpandableCell = <TData,>({ cell, icon, lazy, children }: ExpandableCellProps<TData>) => {
  const expButton = expanedButton(cell.row, lazy);
  return (
    <Flex direction='row' alignItems='center' gap={1} className={expandCell}>
      {Array.from({ length: cell.row.depth }, (_, i) => (
        <div key={i} className={indent} />
      ))}
      {expButton}
      {icon && <IvyIcon style={expButton ? {} : { paddingLeft: 24 }} icon={icon} className={cellIcon} />}
      {children ? children : <span>{cell.getValue()}</span>}
    </Flex>
  );
};
ExpandableCell.displayName = 'ExpandableCell';

export { ExpandableCell };
