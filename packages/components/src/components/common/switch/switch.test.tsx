import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default } from './switch.stories';

const Switch = composeStory(Default, Meta);

test('toggle', async () => {
  render(<Switch />);
  const input = screen.getByRole('switch');
  expect(input).not.toBeChecked();

  await userEvent.click(input);
  expect(input).toBeChecked();

  await userEvent.click(input);
  expect(input).not.toBeChecked();
});

test('toggle by label', async () => {
  render(<Switch label='test switch' />);
  const label = screen.getByLabelText('test switch');
  const input = screen.getByRole('switch');
  expect(input).not.toBeChecked();

  await userEvent.click(label);
  expect(input).toBeChecked();
});

test('toggled with keyboard', async () => {
  render(<Switch />);
  const input = screen.getByRole('switch');
  await userEvent.tab();
  expect(input).toHaveFocus();
  expect(input).not.toBeChecked();

  await userEvent.keyboard('[Space]');
  expect(input).toBeChecked();

  await userEvent.keyboard('[Enter]');
  expect(input).not.toBeChecked();
});

test('readonly mode', () => {
  render(<Switch label='test switch' onChange={() => {}} />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('switch')).toBeDisabled();
});

test('disabled mode', () => {
  render(<Switch label='test switch' checked={true} disabled={true} />);
  expect(screen.getByRole('switch')).toBeDisabled();
});
