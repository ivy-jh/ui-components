import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator';

const meta: Meta<typeof Separator> = {
  title: 'Common/Separator',
  component: Separator
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: 300, margin: '0 15px' }}>
      <div className='Text' style={{ fontWeight: 500 }}>
        Radix Primitives
      </div>
      <div className='Text'>An open-source UI component library.</div>
      <Separator />
      <div style={{ display: 'flex', height: 20, alignItems: 'center' }}>
        <div className='Text'>Blog</div>
        <Separator decorative orientation='vertical' />
        <div className='Text'>Docs</div>
        <Separator decorative orientation='vertical' />
        <div className='Text'>Source</div>
      </div>
    </div>
  )
};
