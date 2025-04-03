import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputGroup, PasswordInput, SearchInput } from './input';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';
import { BasicField } from '@/components/common/field/field';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
  component: Input,
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: props => <Input type='email' placeholder='Email' {...props} />
};

export const WithLabel: Story = {
  render: props => (
    <BasicField label='Name'>
      <Input {...props} />
    </BasicField>
  )
};

export const WithButton: Story = {
  render: props => (
    <BasicField label='Name'>
      <InputGroup>
        <Input {...props} />
        <Button type='submit' icon={IvyIcons.ListSearch} />
      </InputGroup>
    </BasicField>
  )
};

export const File: Story = {
  render: props => (
    <BasicField label='File'>
      <Input type='file' {...props} />
    </BasicField>
  )
};

export const Password: StoryObj<typeof PasswordInput> = {
  render: props => (
    <BasicField label='Password'>
      <PasswordInput {...props} />
    </BasicField>
  )
};

export const Search: StoryObj<typeof SearchInput> = {
  render: props => {
    return <SearchInput {...props} placeholder='Search...' />;
  }
};
