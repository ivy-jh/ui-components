import type { Meta, StoryObj } from '@storybook/react';
import { Combobox, type ComboboxOption } from './combobox';
import { IvyIcons } from '@axonivy/ui-icons';
import { Flex } from '@/components/common/flex/flex';
import { IvyIcon } from '@/components/common/icon/icon';
import { vars } from '@/styles/theme.css';
import { BasicField } from '@/components/common/field/field';

const meta: Meta<typeof Combobox> = {
  title: 'Common/Combobox',
  component: Combobox,
  args: {
    disabled: false
  }
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const languages = [
  { label: 'English', value: 'en', icon: IvyIcons.SubReceiveOutline, info: 'this is additional info' },
  { label: 'French', value: 'fr', icon: IvyIcons.Check, info: 'crazy language' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' }
];

export const Default: Story = {
  render: ({ disabled }) => <Combobox value='' onChange={() => {}} options={languages} disabled={disabled} />
};

type ExtendedComboboxOption = ComboboxOption & {
  label: string;
  info?: string;
  icon?: IvyIcons;
};

export const WithExtendedItem: Story = {
  render: ({ disabled }) => {
    const extendedOptionFilter = ({ value, label, info }: ExtendedComboboxOption, input?: string) => {
      if (!input) {
        return true;
      }
      const filterIncludes = (value?: string) => (value ? value.toLocaleLowerCase().includes(input.toLowerCase()) : false);
      return filterIncludes(value) || filterIncludes(label) || filterIncludes(info);
    };

    const ExtendedComboboxItem = ({ icon, label, info }: ExtendedComboboxOption) => (
      <Flex gap={1} alignItems='center'>
        {icon && <IvyIcon icon={icon} />}
        <span>{label}</span>
        <span style={{ color: vars.color.n700 }}>{info}</span>
      </Flex>
    );

    return (
      <Combobox
        value=''
        onChange={() => {}}
        options={languages}
        disabled={disabled}
        itemRender={option => <ExtendedComboboxItem {...option} />}
        optionFilter={extendedOptionFilter}
      />
    );
  }
};

export const WithFieldset: Story = {
  render: ({ disabled }) => (
    <BasicField label='Many entries' message={{ message: 'this is a warning', variant: 'warning' }}>
      <Combobox value='' onChange={() => {}} options={[...languages, ...languages]} disabled={disabled} />
    </BasicField>
  )
};
