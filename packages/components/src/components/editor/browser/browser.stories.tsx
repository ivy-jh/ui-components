import type { Meta, StoryObj } from '@storybook/react';
import { BrowsersView, useBrowser } from './browser';
import { cmsData, funcData, roleData, useAttrBrowser } from './data';
import { IvyIcons } from '@axonivy/ui-icons';
import { CmsInfoProvider, FunctionInfoProvider } from './browser-info-provider';
import { useState } from 'react';
import { Button } from '@/components/common/button/button';
import { BasicCheckbox } from '@/components/common/checkbox/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/common/dialog/dialog';
import { InputGroup, Input } from '@/components/common/input/input';
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Flex } from '@/components/common/flex/flex';
import { generateConditionString, logicOperators, operators } from '@/components/editor/condition-builder/condition-builder-utils';
import { useConditionBuilder } from '@/components/editor/condition-builder/useConditionBuilder';

const meta: Meta<typeof BrowsersView> = {
  title: 'Editor/BrowsersView',
  component: BrowsersView,
  argTypes: {
    apply: { control: false },
    applyBtn: { control: false },
    browsers: { control: false }
  }
};

export default meta;

type Story = StoryObj<typeof BrowsersView>;

type DefaultBrowserProps = {
  applyFn?: (value?: string) => void;
  applyBtn?: { label?: string; icon?: IvyIcons };
  initSearch?: string;
  includeConditionBuilder?: boolean;
};

const DefaultBrowser = ({ applyFn, applyBtn, initSearch, includeConditionBuilder }: DefaultBrowserProps) => {
  const roles = useBrowser(roleData, { initialSearch: initSearch, initialSelecteState: { '0.1': true } });
  const attrs = useAttrBrowser();
  const funcs = useBrowser(funcData);
  const cms = useBrowser(cmsData);

  const condition = useConditionBuilder({
    generateConditionString,
    operators,
    logicOperators,
    argumentInput: (value, onChange) => <DialogBrowserInput value={value} onChange={onChange} />
  });

  return (
    <BrowsersView
      browsers={[
        {
          name: 'Roles',
          icon: IvyIcons.Users,
          browser: roles,
          header: <BasicCheckbox checked={true} label='You can also render a checkbox here' />,
          footer: <BasicCheckbox checked={true} label='You can also render a checkbox here' />
        },
        {
          name: 'Attribute',
          icon: IvyIcons.Attribute,
          browser: attrs,
          header: `Info: Lazy loaded row 'requester (User)'`,
          emptyMessage: 'No attributes found'
        },
        {
          name: 'Functions',
          icon: IvyIcons.Function,
          browser: funcs,
          header: 'Info: Lazy loaded info content (1s timeout)',
          infoProvider: row => <FunctionInfoProvider row={row} />,
          applyModifier: row => ({ value: `function: ${row?.original.value}` })
        },
        {
          name: 'CMS',
          icon: IvyIcons.Cms,
          browser: cms,
          header: <CmsHeader />,
          infoProvider: row => <CmsInfoProvider row={row} />,
          applyModifier: row => ({ value: `<%= ivy.co('${row?.original.value}') %>` })
        },
        ...(includeConditionBuilder ? [condition] : [])
      ]}
      apply={(browserName, result) => {
        console.log('apply', browserName, result);
        if (applyFn) applyFn(result?.value);
        else if (result) alert(`Browser '${browserName}' apply: ${result.value}`);
      }}
      options={{ applyBtn }}
    />
  );
};

const CmsHeader = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Flex direction='row' justifyContent='space-between' alignItems='center'>
      Info: More info content (with language details) / value modified with macro tags
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button icon={IvyIcons.Dots} aria-label='CMS-Quickaction' title='CMS-Quickaction' />
        </PopoverTrigger>
        <PopoverContent sideOffset={12} collisionPadding={5}>
          <Flex direction='column' gap={2}>
            <Button
              icon={IvyIcons.Process}
              aria-label={`CMS-Quickaction-local`}
              title={`Create content object: 'Dialogs/Bla' value: bla`}
              onClick={() => setPopoverOpen(false)}
            >
              Add to local CMS
            </Button>
            <Button
              icon={IvyIcons.Process}
              aria-label={`CMS-Quickaction-global`}
              title={`Create content object: 'Labels/Bla' value: bla`}
              onClick={() => setPopoverOpen(false)}
            >
              Add to global CMS
            </Button>
          </Flex>
          <PopoverArrow />
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export const Default: Story = {
  render: () => <DefaultBrowser includeConditionBuilder={true} />
};

const DialogBrowserInput = ({
  value,
  onChange,
  includeConditionBuilder
}: {
  value: string;
  onChange: (change: string) => void;
  includeConditionBuilder?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <InputGroup style={{ flex: '1' }}>
        <Input value={value} onChange={e => onChange(e.target.value)} />
        <DialogTrigger asChild>
          <Button icon={IvyIcons.ListSearch} aria-label='Browser' />
        </DialogTrigger>
      </InputGroup>
      <DialogContent style={{ height: '80vh' }}>
        <DefaultBrowser
          applyFn={value => {
            if (value) onChange(value);
            setOpen(false);
          }}
          initSearch={value}
          includeConditionBuilder={includeConditionBuilder}
        />
      </DialogContent>
    </Dialog>
  );
};

export const DialogBrowser: Story = {
  render: () => {
    const [input, setInput] = useState('');
    return <DialogBrowserInput value={input} onChange={setInput} />;
  }
};

export const DialogBrowserWithTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <InputGroup>
          <Input value={input} onChange={e => setInput(e.target.value)} />
          <DialogTrigger asChild>
            <Button icon={IvyIcons.ListSearch} aria-label='Browser' />
          </DialogTrigger>
        </InputGroup>
        <DialogContent style={{ height: '80vh', gridTemplateRows: 'auto 1fr' }}>
          <DialogHeader>
            <DialogTitle>Choose a browser...</DialogTitle>
          </DialogHeader>
          <DefaultBrowser
            applyFn={value => {
              if (value) setInput(value);
              setOpen(false);
            }}
            applyBtn={{ label: 'Import', icon: IvyIcons.Download }}
          />
        </DialogContent>
      </Dialog>
    );
  }
};
