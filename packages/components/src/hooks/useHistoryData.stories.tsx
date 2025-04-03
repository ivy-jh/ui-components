import { Button } from '@/components/common/button/button';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useHistoryData } from './useHistoryData';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components/common/flex/flex';

const meta: Meta = {
  title: 'Hooks/useHistoryData',
  tags: ['autodocs']
};

export default meta;

export const Default: StoryObj = {
  render: () => {
    const [count, setCount] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const history = useHistoryData<number>({
      logger: msg => {
        console.log(msg);
        setLogs([msg, ...logs]);
      }
    });

    return (
      <Flex direction='column' gap={2}>
        <Flex gap={2}>
          <Button
            variant='primary'
            icon={IvyIcons.Plus}
            onClick={() =>
              setCount(prevCount => {
                const nextCount = prevCount + 1;
                history.push(nextCount);
                return nextCount;
              })
            }
          >
            Count: {count}
          </Button>
          <Button
            disabled={!history.canUndo}
            variant='outline'
            icon={IvyIcons.Undo}
            onClick={() => history.undo(updater => setCount(updater))}
          >
            Undo
          </Button>
          <Button
            disabled={!history.canRedo}
            variant='outline'
            icon={IvyIcons.Redo}
            onClick={() => history.redo(updater => setCount(updater))}
          >
            Redo
          </Button>
        </Flex>
        <h4>History Log</h4>
        <div>
          {logs.map((log, index) => (
            <code style={{ display: 'block' }} key={index}>
              {log}
            </code>
          ))}
        </div>
      </Flex>
    );
  }
};
