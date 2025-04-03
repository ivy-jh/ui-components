import type { Meta, StoryObj } from '@storybook/react';
import { SidebarHeader, SidebarMessages } from './header';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';
import { Message } from '@/components/common/message/message';

const meta: Meta<typeof SidebarHeader> = {
  title: 'Editor/Sidebar/Header',
  component: SidebarHeader,
  argTypes: {
    icon: { control: 'select', options: Object.values(IvyIcons) }
  }
};

export default meta;

type Story = StoryObj<typeof SidebarHeader>;

export const Default: Story = {
  args: {
    icon: IvyIcons.UserDialog,
    title: 'User Dialog - Enter Request'
  },
  render: props => (
    <SidebarHeader {...props}>
      <Button icon={IvyIcons.Help} aria-label='Help' />
    </SidebarHeader>
  )
};

export const WithMessages: Story = {
  args: {
    icon: undefined,
    title: 'User Dialog - Enter Request'
  },
  render: props => (
    <>
      <SidebarHeader {...props}>
        <Button icon={IvyIcons.Help} />
      </SidebarHeader>
      <SidebarMessages>
        <Message variant='error' message='Parameter code: Variable "asdf" cannot be resolved Instruction: asdf' />
        <Message variant='warning' message='This is a warning' />
        <Message
          variant='info'
          message='This is a very long message: bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla '
        />
      </SidebarMessages>
    </>
  )
};
