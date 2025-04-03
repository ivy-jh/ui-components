import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './message';
import { Input } from '@/components/common/input/input';
import { BasicField } from '@/components/common/field/field';

const meta: Meta<typeof Message> = {
  title: 'Common/Message',
  component: Message,
  argTypes: {
    variant: { type: 'string', control: 'select', defaultValue: 'default', options: [undefined, 'description', 'info', 'warning', 'error'] }
  },
  args: {
    message: 'This is a message',
    variant: undefined
  }
};

export default meta;

type Story = StoryObj<typeof Message>;

export const Default: Story = {
  render: props => <Message {...props} />
};

export const WithInput: Story = {
  render: ({ message, variant }) => (
    <BasicField label='Name' message={{ message, variant }}>
      <Input />
    </BasicField>
  )
};

export const WithLink: Story = {
  render: () => (
    <Message>
      This is an <a href='#'>embedded</a> link.
    </Message>
  )
};
