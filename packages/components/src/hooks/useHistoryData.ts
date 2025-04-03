import type { UpdateConsumer } from '@/types/lambda';
import { useReducer } from 'react';

type HistoryState<T> = {
  history: Array<T>;
  historyIndex: number;
};

type HistoryAction<T> = { options?: HistoryOptions } & (
  | {
      type: 'PUSH';
      data: T;
    }
  | { type: 'UNDO'; updater: UpdateConsumer<T> }
  | { type: 'REDO'; updater: UpdateConsumer<T> }
);

export type HistoryOptions = {
  maxHistory?: number;
  logger?: (message: string) => void;
};

const reducer = <T>(state: HistoryState<T>, action: HistoryAction<T>): HistoryState<T> => {
  switch (action.type) {
    case 'PUSH':
      return pushHistory(state, action.data, action.options);
    case 'UNDO':
      return doHistoryChange(state, action.updater, -1, action.options);
    case 'REDO':
      return doHistoryChange(state, action.updater, 1, action.options);
  }
};

const pushHistory = <T>(state: HistoryState<T>, data: T, options?: HistoryOptions): HistoryState<T> => {
  let historyIndex = state.historyIndex + 1;
  const history = [...state.history.slice(0, historyIndex), structuredClone(data)];
  if (historyIndex > (options?.maxHistory ?? 50)) {
    history.shift();
    historyIndex--;
  }
  options?.logger?.(`Index: ${historyIndex} -> history: ${history}`);
  return { history, historyIndex };
};

const doHistoryChange = <T>(
  state: HistoryState<T>,
  updater: UpdateConsumer<T>,
  direction: number,
  options?: HistoryOptions
): HistoryState<T> => {
  const historyIndex = state.historyIndex + direction;
  const data = state.history[historyIndex];
  if (data === undefined) {
    return state;
  }
  options?.logger?.(`Index: ${historyIndex} -> history: ${state.history}`);
  updater(() => data);
  return { ...state, historyIndex };
};

export const useHistoryData = <T>(options?: { maxHistory?: number; logger?: (message: string) => void }) => {
  const [state, dispatch] = useReducer(reducer, { history: [] as Array<T>, historyIndex: -1 });

  const push = (data: T) => dispatch({ type: 'PUSH', data, options });
  const undo = (updater: UpdateConsumer<T>) => dispatch({ type: 'UNDO', updater, options });
  const redo = (updater: UpdateConsumer<T>) => dispatch({ type: 'REDO', updater, options });
  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  return { push, undo, redo, canUndo, canRedo };
};
