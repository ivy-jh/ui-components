import type { Meta, StoryObj } from '@storybook/react';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';
import { BasicField, Field } from './field';
import { Input } from '@/components/common/input/input';

const meta: Meta<typeof BasicField> = {
  title: 'Common/Field',
  component: Field,
  argTypes: {
    message: { control: 'object' },
    control: { control: 'object' }
  },
  args: {
    label: 'Name'
  }
};

export default meta;

type Story = StoryObj<typeof BasicField>;

export const Default: Story = {
  render: props => (
    <BasicField {...props}>
      <Input />
    </BasicField>
  )
};

export const WithMessage: Story = {
  render: props => (
    <BasicField label='Name' message={{ message: 'this is a warning', variant: 'warning' }} {...props}>
      <Input />
    </BasicField>
  )
};

export const WithControl: Story = {
  render: props => (
    <BasicField label='Name' control={<Button icon={IvyIcons.Trash} aria-label='Remove row' onClick={() => alert('remove')} />} {...props}>
      <Input />
    </BasicField>
  )
};
