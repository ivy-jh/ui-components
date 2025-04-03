import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, toast } from './toaster';
import { Button } from '../button/button';
import { IvyIcon } from '../icon/icon';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components/common/flex/flex';

const meta: Meta<typeof Toaster> = {
  title: 'Common/Toaster',
  component: Toaster
};

export default meta;

type Story = StoryObj<typeof Toaster>;

const promise = (): Promise<{ name: string }> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() * 10 > 5) {
        resolve({ name: 'Sonner' });
      } else {
        reject('Random error');
      }
    }, 2000)
  );

export const Default: Story = {
  render: (props, { globals }) => (
    <Flex direction='column' gap={2}>
      <Flex direction='row' gap={2}>
        <Button
          variant='outline'
          onClick={() =>
            toast('Event', {
              description: 'Sunday, December 03, 2023 at 9:00 AM',
              action: {
                label: 'Undo',
                onClick: () => console.log('Undo')
              },
              closeButton: true
            })
          }
        >
          Show Event
        </Button>
        <Button
          variant='outline'
          onClick={() =>
            toast(
              <>
                <IvyIcon icon={IvyIcons.ErrorXMark} />
                Error
              </>
            )
          }
        >
          Custom React Event
        </Button>
        <Button
          variant='outline'
          onClick={() =>
            toast.promise(promise, {
              loading: 'Loading...',
              success: data => `${data.name} toast has been added`,
              error: reason => reason
            })
          }
        >
          Promise
        </Button>
      </Flex>
      <Flex direction='row' gap={2}>
        <Button variant='outline' icon={IvyIcons.ErrorXMark} onClick={() => toast.error('Error')}>
          Error
        </Button>
        <Button variant='outline' icon={IvyIcons.Caution} onClick={() => toast.warning('Warning')}>
          Warning
        </Button>
        <Button variant='outline' icon={IvyIcons.InfoCircle} onClick={() => toast.info('Info')}>
          Info
        </Button>
        <Button variant='outline' icon={IvyIcons.Check} onClick={() => toast.success('Success')}>
          Success
        </Button>
        <Button variant='outline' icon={IvyIcons.Redo} onClick={() => toast.loading('Loading...')}>
          Loading
        </Button>
      </Flex>
      <Toaster {...props} theme={globals.theme} />
    </Flex>
  )
};
