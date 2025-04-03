import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup, ToggleGroupItem } from './toggleGroup';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Common/ToggleGroup',
  component: ToggleGroup,
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    gap: { control: 'select', options: [1, 2, 3, 4] }
  },
  args: {
    disabled: false,
    type: 'single',
    gap: 2
  }
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: props => (
    <ToggleGroup {...props} aria-label='Class selection'>
      <ToggleGroupItem value='data-class' asChild>
        <Button>Option 1</Button>
      </ToggleGroupItem>
      <ToggleGroupItem value='business-data-class' asChild>
        <Button icon={IvyIcons.AlignVertical}>Option 2</Button>
      </ToggleGroupItem>
      <ToggleGroupItem value='entity-class' asChild>
        <Button>Option 1</Button>
      </ToggleGroupItem>
    </ToggleGroup>
  )
};

//as soon as mobile/table icons are available, they still have to be adapted here
export const OnlyIcon: Story = {
  render: props => (
    <ToggleGroup {...props} aria-label='Class selection'>
      <ToggleGroupItem value='desktop' asChild>
        <Button icon={IvyIcons.EventStart} size='large' />
      </ToggleGroupItem>
      <ToggleGroupItem value='tablet' asChild>
        <Button icon={IvyIcons.DeviceTablet} size='large' />
      </ToggleGroupItem>
      <ToggleGroupItem value='mobile' asChild>
        <Button icon={IvyIcons.DeviceMobile} size='large' />
      </ToggleGroupItem>
    </ToggleGroup>
  )
};
