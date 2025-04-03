import type { Meta, StoryObj } from '@storybook/react';
import { Outline } from './outline';
import { outlineData } from '@/components/editor/sidebar/outline/data';

const meta: Meta<typeof Outline> = {
  title: 'Editor/Sidebar/Outline',
  component: Outline,
  argTypes: {
    selection: { control: 'text', description: `Change selection via property (e.g. '1', '2', '3')` },
    onClick: { control: false },
    onDoubleClick: { control: false },
    outline: { control: false }
  },
  args: {
    selection: ''
  }
};

export default meta;

type Story = StoryObj<typeof Outline>;

export const Default: Story = {
  render: props => <Outline {...props} outline={outlineData} />
};
