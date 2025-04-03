export const isMac = () => window?.navigator?.userAgent?.indexOf('Mac') !== -1;
export const isWindows = () => window?.navigator?.userAgent?.indexOf('Windows') !== -1;

type ModKey = '⌘' | 'CTRL';

const modKey = (): ModKey => (isMac() ? '⌘' : 'CTRL');

const optKey = (): string => (isMac() ? '⌥' : 'ALT');

export const hotkeyText = (hotkey: string): string => hotkey.replace('mod', modKey()).replace('alt', optKey()).replace('shift', '⇧');

export const hotkeyUndoFix = (e: KeyboardEvent, undo: () => void) => {
  if (isWindows() && e.code === 'KeyZ' && e.key === 'y') {
    return;
  }
  undo();
};

export const hotkeyRedoFix = (e: KeyboardEvent, redo: () => void) => {
  if (isWindows() && e.code === 'KeyY' && e.key === 'z') {
    return;
  }
  redo();
};
