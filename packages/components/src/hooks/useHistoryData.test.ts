import { act, renderHook } from '@testing-library/react';
import { useHistoryData, type HistoryOptions } from './useHistoryData';

const updater = vi.fn();

beforeEach(() => {
  updater.mockImplementation(data => data());
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('undo', () => {
  const view = renderHistoryHook(0);
  pushHistory(view, 1);
  pushHistory(view, 2);
  pushHistory(view, 3);

  undo(view, true, true);
  expect(updater).toBeCalledTimes(1);
  expect(updater).toReturnWith(2);

  undo(view, true, true);
  expect(updater).toBeCalledTimes(2);
  expect(updater).toReturnWith(1);

  undo(view, false, true);
  expect(updater).toBeCalledTimes(3);
  expect(updater).toReturnWith(0);

  // further undos should not change the data
  undo(view, false, true);
  expect(updater).toBeCalledTimes(3);
});

test('redo', () => {
  const view = renderHistoryHook('');
  pushHistory(view, 'hi');
  pushHistory(view, 'hello');
  pushHistory(view, 'bye');

  undo(view, true, true);
  undo(view, true, true);
  undo(view, false, true);

  redo(view, true, true);
  expect(updater).toBeCalledTimes(4);
  expect(updater).toReturnWith('hi');

  redo(view, true, true);
  expect(updater).toBeCalledTimes(5);
  expect(updater).toReturnWith('hello');

  redo(view, true, false);
  expect(updater).toBeCalledTimes(6);
  expect(updater).toReturnWith('bye');

  // further redos should not change the data
  redo(view, true, false);
  expect(updater).toBeCalledTimes(6);
});

test('undo and redo with new push', () => {
  const view = renderHistoryHook({});
  const history1 = { a: 1 };
  const history2 = { b: 2 };
  const history3 = { c: 3 };
  pushHistory(view, history1);
  pushHistory(view, history2);

  undo(view, true, true);
  expect(updater).toBeCalledTimes(1);
  expect(updater).toReturnWith(history1);

  pushHistory(view, history3);
  undo(view, true, true);
  expect(updater).toBeCalledTimes(2);
  expect(updater).toReturnWith(history1);

  undo(view, false, true);
  expect(updater).toBeCalledTimes(3);
  expect(updater).toReturnWith({});

  // further undos should not change the data
  undo(view, false, true);
  expect(updater).toBeCalledTimes(3);

  redo(view, true, true);
  expect(updater).toBeCalledTimes(4);
  expect(updater).toReturnWith(history1);

  redo(view, true, false);
  expect(updater).toBeCalledTimes(5);
  expect(updater).toReturnWith(history3);

  // further redos should not change the data
  redo(view, true, false);
  expect(updater).toBeCalledTimes(5);
});

test('max history', () => {
  const view = renderHistoryHook(0, { maxHistory: 2 });
  pushHistory(view, 1);
  pushHistory(view, 2);
  pushHistory(view, 3);

  undo(view, true, true);
  expect(updater).toReturnWith(2);
  undo(view, false, true);
  expect(updater).toReturnWith(1);
  undo(view, false, true);
  expect(updater).toBeCalledTimes(2);
});

test('logger', () => {
  const logger = vi.fn();
  expect(logger).toBeCalledTimes(0);

  const view = renderHistoryHook(0, { logger });
  expect(logger).toBeCalledTimes(1);
  expect(logger).toHaveBeenLastCalledWith('Index: 0 -> history: 0');

  pushHistory(view, 1);
  expect(logger).toBeCalledTimes(2);
  expect(logger).toHaveBeenLastCalledWith('Index: 1 -> history: 0,1');

  undo(view, false, true);
  expect(logger).toBeCalledTimes(3);
  expect(logger).toHaveBeenLastCalledWith('Index: 0 -> history: 0,1');

  redo(view, true, false);
  expect(logger).toBeCalledTimes(4);
  expect(logger).toHaveBeenLastCalledWith('Index: 1 -> history: 0,1');
});

const renderHistoryHook = <T>(init: T, options?: HistoryOptions) => {
  const view = renderHook(() => useHistoryData<T>(options));
  act(() => view.result.current.push(init));
  view.rerender();
  expect(view.result.current.canUndo).toBeFalsy();
  expect(view.result.current.canRedo).toBeFalsy();
  return view;
};

const pushHistory = <T, U extends T>(view: ReturnType<typeof renderHistoryHook<T>>, data: U) => {
  act(() => view.result.current.push(data));
  view.rerender();
  expect(view.result.current.canUndo).toBeTruthy();
  expect(view.result.current.canRedo).toBeFalsy();
};

const undo = <T>(view: ReturnType<typeof renderHistoryHook<T>>, canUndo: boolean, canRedo: boolean) => {
  act(() => view.result.current.undo(updater));
  view.rerender();
  expect(view.result.current.canUndo).toEqual(canUndo);
  expect(view.result.current.canRedo).toEqual(canRedo);
};

const redo = <T>(view: ReturnType<typeof renderHistoryHook<T>>, canUndo: boolean, canRedo: boolean) => {
  act(() => view.result.current.redo(updater));
  view.rerender();
  expect(view.result.current.canUndo).toEqual(canUndo);
  expect(view.result.current.canRedo).toEqual(canRedo);
};
