import type { Meta } from '@storybook/react';
import { Toolbar, ToolbarContainer, ToolbarTitle } from './toolbar';
import { IvyIcons } from '@axonivy/ui-icons';
import { Button } from '@/components/common/button/button';
import { Field } from '@/components/common/field/field';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { Separator } from '@/components/common/separator/separator';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@/components/common/popover/popover';
import { Label } from '@/components/common/label/label';
import { Switch } from '@/components/common/switch/switch';

const meta: Meta<typeof Toolbar> = {
  title: 'Editor/Toolbar',
  component: Toolbar
};

export default meta;

export const Default = ({ sideBarCollapse }: { sideBarCollapse?: () => void }) => (
  <Toolbar>
    <Flex>
      <Flex gap={1}>
        <Button icon={IvyIcons.SelectionTool} size='large' toggle={true} />
        <Button icon={IvyIcons.MultiSelection} size='large' />
      </Flex>
      <ToolbarContainer maxWidth={650}>
        <Flex>
          <Separator orientation='vertical' style={{ height: '26px' }} />
          <Flex gap={1}>
            <Button icon={IvyIcons.Undo} size='large' />
            <Button icon={IvyIcons.Redo} size='large' disabled={true} />
          </Flex>
        </Flex>
      </ToolbarContainer>
      <ToolbarContainer minWidth={650}>
        <Flex>
          <Separator orientation='vertical' style={{ height: '26px' }} />
          <Flex gap={1}>
            <Button icon={IvyIcons.DeviceMobile} size='large' />
            <Button icon={IvyIcons.EventStart} size='large' />
          </Flex>
        </Flex>
      </ToolbarContainer>
    </Flex>
    <Flex>
      <Popover>
        <PopoverTrigger asChild>
          <Button icon={IvyIcons.Settings} size='large' />
        </PopoverTrigger>
        <PopoverContent sideOffset={12}>
          <Flex direction='column' gap={2}>
            <Field direction='row' alignItems='center' justifyContent='space-between' gap={4}>
              <Label>
                <Flex alignItems='center' gap={1}>
                  <IvyIcon icon={IvyIcons.DarkMode} />
                  Theme
                </Flex>
              </Label>
              <Switch defaultChecked={false} size='small' />
            </Field>
            <Field direction='row' alignItems='center' justifyContent='space-between' gap={4}>
              <Label>
                <Flex alignItems='center' gap={1}>
                  <IvyIcon icon={IvyIcons.GridDots} />
                  Grid
                </Flex>
              </Label>
              <Switch defaultChecked={true} size='small' />
            </Field>
          </Flex>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
      <Button icon={IvyIcons.LayoutSidebarRightCollapse} size='large' onClick={sideBarCollapse} />
    </Flex>
  </Toolbar>
);

export const WithTitle = () => (
  <Toolbar>
    <Flex>
      <Flex gap={1}>
        <ToolbarTitle>Rest Clients Editor</ToolbarTitle>
      </Flex>
    </Flex>
    <Flex>
      <Button icon={IvyIcons.LayoutSidebarRightCollapse} size='large' />
    </Flex>
  </Toolbar>
);
