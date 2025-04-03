import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default, WithFieldset } from './textarea.stories';

const Textarea = composeStory(Default, Meta);
const LabelTextarea = composeStory(WithFieldset, Meta);

test('by label', async () => {
  render(<LabelTextarea />);
  const label = screen.getByLabelText('Name');
  const input = screen.getByRole('textbox');
  expect(input).not.toHaveFocus();
  expect(screen.getByRole('paragraph')).toHaveTextContent('this is a warning');

  await userEvent.click(label);
  expect(input).toHaveFocus();
});

test('readonly mode', () => {
  render(<Textarea />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('disabled mode', () => {
  render(<Textarea disabled={true} />);
  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('auto resize off', async () => {
  render(<Textarea />);
  const input = screen.getByRole('textbox');
  expect(input).not.toHaveAttribute('style');
});

test('auto resize on', async () => {
  render(<Textarea autoResize={true} />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveAttribute('style', 'height: 14px;');

  await userEvent.type(input, 'test\nsecond\nbla');
  expect(input).toHaveValue('test\nsecond\nbla');
  expect(input).toHaveAttribute('style', 'height: 42px;');
});
