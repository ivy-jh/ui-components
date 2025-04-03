import type { RowSelectionState, Updater } from '@tanstack/react-table';
import { createTable, getCoreRowModel } from '@tanstack/react-table';

export const setupData = () => {
  return [
    { name: 'NameData0', value: 'ValueData0' },
    { name: 'NameData1', value: 'ValueData1' },
    { name: 'NameData2', value: 'ValueData2' },
    { name: 'NameData3', value: 'ValueData4' },
    { name: 'NameData4', value: 'ValueData4' }
  ];
};

export const setupTable = () => {
  const data = setupData();
  const onRowSelectionChangeValues: Array<Updater<RowSelectionState>> = [];

  const table = createTable({
    columns: [],
    data: data,
    getCoreRowModel: getCoreRowModel(),
    onStateChange: () => {},
    onRowSelectionChange: (value: Updater<RowSelectionState>) => {
      onRowSelectionChangeValues.push(value);
    },
    renderFallbackValue: undefined,
    state: {
      rowSelection: {}
    }
  });
  return { data, table, onRowSelectionChangeValues };
};
