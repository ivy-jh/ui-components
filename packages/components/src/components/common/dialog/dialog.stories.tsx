import type { Meta, StoryObj } from '@storybook/react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from '@/components/common/button/button';
import { Flex } from '@/components/common/flex/flex';
import { Input } from '@/components/common/input/input';
import { BasicSelect } from '@/components/common/select/select';
import { Textarea } from '@/components/common/textarea/textarea';
import { BasicField } from '@/components/common/field/field';
import { Combobox } from '@/components/common/combobox/combobox';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Common/Dialog',
  component: Dialog,
  args: {
    modal: true
  }
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: props => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog open={open} onOpenChange={change => setOpen(change)} {...props}>
        <DialogTrigger asChild>
          <Button variant='outline'>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={event => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Flex direction='column' gap={2}>
              <BasicField label='Name'>
                <Input />
              </BasicField>
              <BasicField label='Comment'>
                <Textarea />
              </BasicField>
              <BasicField label='Fruit'>
                <BasicSelect
                  items={[
                    { value: 'apple', label: 'Apple' },
                    { value: 'banana', label: 'Banana' }
                  ]}
                />
              </BasicField>
              <BasicField label='Car'>
                <Combobox value='' onChange={() => {}} options={[{ value: 'bmv' }, { value: 'volvo' }]} />
              </BasicField>
              <DialogFooter>
                <Button variant='primary' size='large' type='submit'>
                  Save changes
                </Button>
              </DialogFooter>
            </Flex>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
};
