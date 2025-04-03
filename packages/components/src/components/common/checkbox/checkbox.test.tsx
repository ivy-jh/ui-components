import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default } from './checkbox.stories';

const Checkbox = composeStory(Default, Meta);

test('toggled by box', async () => {
  render(<Checkbox />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();

  await userEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

test('toggled by label', async () => {
  render(<Checkbox label='test checkbox' />);
  const label = screen.getByLabelText('test checkbox');
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();

  await userEvent.click(label);
  expect(checkbox).toBeChecked();
});

test('toggled with keyboard', async () => {
  render(<Checkbox />);
  const checkbox = screen.getByRole('checkbox');
  await userEvent.tab();
  expect(checkbox).toHaveFocus();
  expect(checkbox).not.toBeChecked();

  await userEvent.keyboard('[Space]');
  expect(checkbox).toBeChecked();

  await userEvent.keyboard('[Space]');
  expect(checkbox).not.toBeChecked();
});

test('readonly mode', () => {
  render(<Checkbox label='test checkbox' onChange={() => {}} />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('checkbox')).toBeDisabled();
});

test('disabled mode', () => {
  render(<Checkbox label='test checkbox' checked={true} disabled={true} />);
  expect(screen.getByRole('checkbox')).toBeDisabled();
});
