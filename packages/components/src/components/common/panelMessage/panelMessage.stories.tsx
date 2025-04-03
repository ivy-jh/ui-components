import type { Meta, StoryObj } from '@storybook/react';
import { PanelMessage } from './panelMessage';
import { IvyIcons } from '@axonivy/ui-icons';

const meta: Meta<typeof PanelMessage> = {
  title: 'Common/Message/PanelMessage',
  component: PanelMessage
};

export default meta;

type Story = StoryObj<typeof PanelMessage>;

export const Default: Story = {
  args: {
    message: 'Nothing there yet. Select an Element to edit its properties.'
  },
  render: props => <PanelMessage {...props} />
};

export const Row: Story = {
  args: {
    message: 'Drag first element inside the layout',
    mode: 'row'
  },
  render: props => <PanelMessage {...props} />
};

export const ErrorMessage: Story = {
  args: {
    message: 'An error occured',
    mode: 'column',
    icon: IvyIcons.ErrorXMark
  },
  render: props => <PanelMessage {...props} />
};
