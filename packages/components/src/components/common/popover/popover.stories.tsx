import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverArrow, PopoverClose, PopoverContent, PopoverTrigger } from './popover';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';

const meta: Meta<typeof Popover> = {
  title: 'Common/Popover',
  component: Popover
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent collisionPadding={20}>
        helloasdfasdfasdfasdfasdfdsafadsfsadfdsafsahelloasdfasdfasdfas dfasdfdsafadsfsadfdsafsahelloasdfasdfasdfasdfasdfdsafadsfsadfdsaf
        sahelloasdfasdfasdfasdfasdfdsafadsfsadfdsafsahelloasdfasdfasdfasdfasdfdsafadsfsadfdsafsa
        <PopoverArrow className='PopoverArrow' />
      </PopoverContent>
    </Popover>
  )
};

export const WithClose: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Open popover</Button>
      </PopoverTrigger>
      <PopoverContent collisionPadding={20}>
        helloasdfasdfasdfasdfasdfdsafadsfsadfdsafsahelloasdfasdfasdfas dfasdfdsafadsfsadfdsafsahelloasdfasdfasdfasdfasdfdsafadsfsadfdsaf
        sahelloasdfasdfasdfasdfasdfdsafadsfsadfdsafsahelloasdfasdfasdfasdfasdfdsafadsfsadfdsafsa
        <PopoverClose asChild>
          <Button size='small' icon={IvyIcons.Close} />
        </PopoverClose>
        <PopoverArrow className='PopoverArrow' />
      </PopoverContent>
    </Popover>
  )
};
