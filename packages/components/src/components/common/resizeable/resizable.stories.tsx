import type { Meta, StoryObj } from '@storybook/react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable';
import { vars } from '@/styles/theme.css';
import { Flex } from '@/components/common/flex/flex';

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Common/Resizeable',
  component: ResizablePanelGroup,
  argTypes: {
    direction: { control: 'select', options: ['horizontal', 'vertical'] }
  },
  args: {
    direction: 'horizontal'
  }
};

export default meta;

type Story = StoryObj<{ direction: 'horizontal' | 'vertical'; withHandle: boolean }>;

export const Default: Story = {
  args: {
    direction: 'horizontal',
    withHandle: true
  },
  render: ({ direction, withHandle }) => (
    <Flex justifyContent='center' alignItems='center'>
      <ResizablePanelGroup
        autoSaveId='ivy-resizable'
        direction={direction}
        style={{ minHeight: '200px', border: vars.border.basic, borderRadius: vars.border.r2 }}
      >
        <ResizablePanel defaultSize={75} minSize={50}>
          <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <span>Content</span>
          </Flex>
        </ResizablePanel>
        <ResizableHandle withHandle={withHandle} />
        <ResizablePanel defaultSize={25} minSize={10}>
          <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <span>Sidebar</span>
          </Flex>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Flex>
  )
};

export const Conditional: StoryObj<{ showLeftPanel: boolean; showRightPanel: boolean }> = {
  args: {
    showLeftPanel: true,
    showRightPanel: true
  },
  render: ({ showLeftPanel, showRightPanel }) => (
    <Flex justifyContent='center' alignItems='center'>
      <ResizablePanelGroup
        autoSaveId='conditional'
        direction='horizontal'
        style={{ minHeight: '200px', border: vars.border.basic, borderRadius: vars.border.r2 }}
      >
        {showLeftPanel && (
          <>
            <ResizablePanel id='left' order={1}>
              <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                <span>Left</span>
              </Flex>
            </ResizablePanel>
            <ResizableHandle />
          </>
        )}
        <ResizablePanel id='center' order={2}>
          <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
            <span>Middle</span>
          </Flex>
        </ResizablePanel>
        {showRightPanel && (
          <>
            <ResizableHandle />
            <ResizablePanel id='right' order={3}>
              <Flex justifyContent='center' alignItems='center' style={{ height: '100%' }}>
                <span>Right</span>
              </Flex>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </Flex>
  )
};
