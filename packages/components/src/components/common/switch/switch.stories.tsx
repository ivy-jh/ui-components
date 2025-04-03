import type { Meta, StoryObj } from '@storybook/react';
import { Switch, BasicSwitch } from './switch';

import { IvyIcons } from '@axonivy/ui-icons';

const meta: Meta<typeof Switch> = {
  title: 'Common/Switch',
  component: Switch,
  argTypes: {
    size: { control: 'select', options: [undefined, 'small', 'large'] }
  },
  args: {
    disabled: false,
    size: undefined
  }
};

export default meta;

type Story = StoryObj<typeof BasicSwitch>;

export const Default: Story = {
  render: ({ label, ...props }) => <BasicSwitch {...props} label={label ? label : 'Airplane Mode'} />
};

type StoryWithIcon = StoryObj<typeof Switch>;

export const WithIcon: StoryWithIcon = {
  render: ({ ...props }) => <Switch {...props} icon={{ icon: IvyIcons.Eye }} size='large' />
};
