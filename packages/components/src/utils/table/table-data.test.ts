import { setupData } from '@/utils/table/test-utils/setup';
import { updateRowData } from './table-data';

const newRowData = { name: 'newDataName', value: 'newDataValue' };

describe('updateRowData', () => {
  test('default', () => {
    const data = setupData();
    const originalData = structuredClone(data);
    const newData = updateRowData(data, 1, newRowData);
    expect(data).toEqual(originalData);
    expect(newData).not.toBe(data);
    expect(newData).toHaveLength(5);
    expect(newData[0]).toEqual(data[0]);
    expect(newData[1]).toEqual(newRowData);
    expect(newData[2]).toEqual(data[2]);
  });

  test('indexOutOfBounds', () => {
    const data = setupData();
    const originalData = structuredClone(data);
    const newData = updateRowData(data, 5, newRowData);
    expect(data).toEqual(originalData);
    expect(newData).not.toBe(data);
    expect(newData).toEqual(data);
  });
});
