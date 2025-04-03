import type { Meta, StoryObj } from '@storybook/react';
import { InputBadge, InputBadgeArea } from './inputBadge';
import { IvyIcons } from '@axonivy/ui-icons';
import { BasicField } from '../field/field';

const badgeProps = [
  {
    regex: /#{\s+data\.[^}]+}/,
    icon: IvyIcons.File,
    badgeTextGen: (text: string) => text.substring(text.lastIndexOf('.') + 1, text.length - 1)
  },
  {
    regex: /#{\s+logic\.[^}]+}/,
    icon: IvyIcons.Process,
    badgeTextGen: (text: string) => text.replace('#{', '').replace('}', '').trim()
  },
  {
    regex: /<%=[^%>]+%>/,
    icon: IvyIcons.Cms,
    badgeTextGen: (text: string) => text,
    tooltip: (text: string) => <div>info: {text}</div>
  },
  {
    regex: /#{[^}]+}/,
    icon: IvyIcons.StartProgram,
    badgeTextGen: (text: string) => text.replaceAll(/#{\s*|\s*}/g, '')
  }
];

const meta: Meta<typeof InputBadge> = {
  title: 'Common/InputBadge',
  component: InputBadge,
  argTypes: {
    value: { type: 'string', description: 'Field input containing badges' },
    badgeProps: { description: 'Object containing badge regex, icon & function to format badge-text' }
  },
  args: {
    value: '<%= ivy.log.info() %> noBadge1 #{ data.object.object.demoData }\nnoBadge2 #{ logic.demoLogic } #{expression}',
    badgeProps: badgeProps
  }
};

type Story = StoryObj<typeof InputBadge>;

export const Default: Story = {
  render: props => <InputBadge {...props} />
};

export const BadgeArea: Story = {
  render: props => <InputBadgeArea {...props} />
};

export const InputBadgeMessage: Story = {
  render: props => (
    <BasicField message={{ message: 'this is a message', variant: 'error' }}>
      <InputBadge {...props} />
    </BasicField>
  )
};

export default meta;
