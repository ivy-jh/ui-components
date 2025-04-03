import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './radio';
import { Field } from '@/components/common/field/field';
import { Label } from '@/components/common/label/label';

const meta: Meta<typeof RadioGroup> = {
  title: 'Common/RadioGroup',
  component: RadioGroup,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] }
  },
  args: {
    disabled: false,
    orientation: 'horizontal'
  }
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: props => (
    <RadioGroup defaultValue='option-one' {...props}>
      <Field direction='row' alignItems='center' gap={2}>
        <RadioGroupItem value='option-one' />
        <Label>Option One</Label>
      </Field>
      <Field direction='row' alignItems='center' gap={2}>
        <RadioGroupItem value='option-two' />
        <Label>Option Two</Label>
      </Field>
      <Field direction='row' alignItems='center' gap={2}>
        <RadioGroupItem value='option-three' />
        <Label>Option Three</Label>
      </Field>
    </RadioGroup>
  )
};
