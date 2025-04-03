import type { Meta, StoryObj } from '@storybook/react';
import {
  BasicCollapsible,
  Collapsible,
  CollapsibleContent,
  CollapsibleState,
  CollapsibleTrigger,
  type CollapsibleControlProps
} from './collapsible';
import { IvyIcons } from '@axonivy/ui-icons';
import { ButtonGroup } from '@/components/common/button/button';
import { Message, type MessageData } from '@/components/common/message/message';

const meta: Meta<typeof Collapsible> = {
  title: 'Common/Collapsible',
  component: Collapsible
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>
        <div>@radix-ui/colors</div>
        <div>@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
};

export const State: StoryObj<MessageData & typeof CollapsibleState> = {
  argTypes: {
    state: { control: 'select', options: ['configured', 'warning', 'error'] }
  },
  args: {
    messages: [
      { variant: 'warning', message: 'this is a warning' },
      { variant: 'info', message: 'info message' }
    ],
    state: undefined
  },
  render: ({ state, messages }) => {
    return (
      <Collapsible>
        <CollapsibleTrigger state={<CollapsibleState state={state} messages={messages} />}>Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <div>@radix-ui/colors</div>
          <div>@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
};

export const Controls: Story = {
  render: () => {
    const control = (props: CollapsibleControlProps) => (
      <ButtonGroup
        {...props}
        controls={[
          { icon: IvyIcons.ArrowsMaximize, onClick: () => alert('Maximize'), title: 'Maximize' },
          { icon: IvyIcons.Search, onClick: () => console.log('yey'), title: 'Search', toggle: true }
        ]}
      />
    );
    return (
      <Collapsible>
        <CollapsibleTrigger control={control}>Toggle</CollapsibleTrigger>
        <CollapsibleContent>
          <div>@radix-ui/colors</div>
          <div>@stitches/react</div>
        </CollapsibleContent>
      </Collapsible>
    );
  }
};

export const Basic: StoryObj<typeof BasicCollapsible> = {
  args: {
    open: undefined,
    state: { messages: [{ variant: 'warning', message: 'there is a warning in here' }] },
    controls: [
      { icon: IvyIcons.ArrowsMaximize, onClick: () => alert('Maximize'), title: 'Maximize' },
      { icon: IvyIcons.Search, onClick: () => console.log('yey'), title: 'Search', toggle: true }
    ]
  },
  render: props => {
    return (
      <BasicCollapsible {...props} label='Basic' defaultOpen={false}>
        <Message variant='warning' message='there is a warning in here' />
      </BasicCollapsible>
    );
  }
};
