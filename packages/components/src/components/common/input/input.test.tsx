import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default, WithLabel, Search, Password } from './input.stories';

const Input = composeStory(Default, Meta);
const LabelInput = composeStory(WithLabel, Meta);
const SearchInput = composeStory(Search, Meta);
const PasswordInput = composeStory(Password, Meta);

test('by label', async () => {
  render(<LabelInput />);
  const label = screen.getByLabelText('Name');
  const input = screen.getByRole('textbox');
  expect(input).not.toHaveFocus();

  await userEvent.click(label);
  expect(input).toHaveFocus();
});

test('readonly mode', () => {
  render(<Input />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('disabled mode', () => {
  render(<Input disabled={true} />);
  expect(screen.getByRole('textbox')).toBeDisabled();
});

test('search', async () => {
  render(<SearchInput />);
  const input = screen.getByRole('textbox');
  expect(screen.queryByRole('button', { name: 'Clean' })).not.toBeInTheDocument();
  expect(input).toHaveAttribute('placeholder', 'Search...');

  await userEvent.type(input, 'test');
  expect(input).toHaveValue('test');
  const cleanBtn = screen.getByRole('button', { name: 'Clean' });
  expect(cleanBtn).toBeVisible();

  await userEvent.click(cleanBtn);
  expect(input).toHaveValue('');
});

test('search readonly', async () => {
  render(<SearchInput />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('textbox')).not.toBeDisabled();
});

test('password', async () => {
  render(<PasswordInput />);
  const input = screen.getByLabelText('Password');
  expect(input).toHaveAttribute('type', 'password');
  await userEvent.click(screen.getByRole('button', { name: 'Show password' }));
  expect(input).toHaveAttribute('type', 'text');
});
