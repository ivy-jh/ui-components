import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { generateConditionString, logicOperators, operators } from './condition-builder-utils';
import { vars } from '@/styles/theme.css';
import { ConditionBuilder } from './conditionBuilder';

const meta: Meta<typeof ConditionBuilder> = {
  title: 'Editor/ConditionBuilder',
  component: ConditionBuilder
};

export default meta;

type Story = StoryObj<typeof ConditionBuilder>;

export const Default: Story = {
  render: () => {
    const [condition, setCondition] = useState<string>();
    return (
      <>
        <ConditionBuilder
          onChange={setCondition}
          generateConditionString={generateConditionString}
          logicOperators={logicOperators}
          operators={operators}
        />
        <pre style={{ border: vars.border.basic, maxHeight: '80px', padding: vars.padding.input, borderRadius: vars.border.r2 }}>
          {condition}
        </pre>
      </>
    );
  }
};
