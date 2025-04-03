import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Common/Spinner',
  component: Spinner,
  argTypes: {
    size: { type: 'string', control: 'select', options: [undefined, 'large', 'medium', 'small'] }
  },
  args: {
    size: undefined
  }
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  render: props => <Spinner {...props} />
};
