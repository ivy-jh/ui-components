import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components/common/flex/flex';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    variant: { type: 'string', control: 'select', options: [undefined, 'primary', 'outline'] },
    size: { type: 'string', control: 'select', options: [undefined, 'large', 'small'] },
    icon: { type: 'string', control: 'select', options: Object.values(IvyIcons) }
  },
  args: {
    disabled: false,
    variant: undefined,
    size: undefined,
    icon: undefined,
    toggle: false,
    spin: false
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'outline'
  },
  render: props => <Button {...props}>Click</Button>
};

export const WithIcon: Story = {
  args: {
    icon: IvyIcons.Home
  },
  render: props => <Button {...props}>Home</Button>
};

export const Loading: Story = {
  args: {
    icon: IvyIcons.Spinner,
    spin: true,
    disabled: true,
    variant: 'primary'
  },
  render: props => <Button {...props}>Loading</Button>
};

export const IconOnly: Story = {
  args: {
    icon: IvyIcons.Home,
    size: undefined
  },
  render: props => <Button {...props} />
};

export const Group: Story = {
  render: props => (
    <Flex direction='row' gap={1}>
      <Button {...props} icon={IvyIcons.Selector} />
      <Button {...props} icon={IvyIcons.MultiSelection} />
    </Flex>
  )
};
