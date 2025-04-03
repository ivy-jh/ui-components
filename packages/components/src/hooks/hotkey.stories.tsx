import { hotkeyText } from '@/utils/hotkey';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const meta: Meta = {
  title: 'Hooks/Hotkey'
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [count, setCount] = useState(0);
    useHotkeys('mod+alt+n', () => setCount(prevCount => prevCount + 1));
    const hotkey = hotkeyText('mod+alt+n');

    return (
      <span>
        Pressed the <b>{hotkey}</b> key {count} times.
      </span>
    );
  }
};

export const Scoped: StoryObj = {
  render: () => {
    const [count, setCount] = useState(0);
    const ref = useHotkeys('c', () => setCount(prevCount => prevCount + 1));
    return (
      <div ref={ref} tabIndex={-1} style={{ border: '2px solid #9e768f' }}>
        <h1>Scoped Hotkeys</h1>
        <p>Focus me, and press c to increment the count</p>
        <p>Count: {count}</p>
      </div>
    );
  }
};

export const Global: StoryObj = {
  render: () => {
    const [count, setCount] = useState(0);
    useHotkeys('q', () => setCount(prevCount => prevCount + 1));
    useHotkeys('w', () => setCount(prevCount => prevCount - 1));
    return (
      <>
        <h1>Global Hotkeys</h1>
        <p>
          Press <b>q</b> to increment the count, and <b>w</b> to decrement it.
        </p>
        <p>Count: {count}</p>
      </>
    );
  }
};
