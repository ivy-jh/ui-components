import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default, UnknownValue, EmptyValue } from './select.stories';

const Select = composeStory(Default, Meta);
const UnknownSelect = composeStory(UnknownValue, Meta);
const EmptySelect = composeStory(EmptyValue, Meta);

test('select', async () => {
  render(<Select />);
  const input = screen.getByRole('combobox');
  expect(input).toHaveTextContent('Select a fruit');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  await userEvent.click(input);
  expect(screen.getByRole('listbox')).toBeVisible();
  expect(screen.getByRole('group')).toHaveTextContent('Fruits');
  expect(screen.getAllByRole('option')).toHaveLength(5);

  await userEvent.keyboard('[Enter]');
  expect(input).toHaveTextContent('Apple');
});

test('select can be handled with keyboard', async () => {
  render(<Select />);
  const select = screen.getByRole('combobox');
  await userEvent.keyboard('[Tab]');
  expect(select).toHaveFocus();
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

  await userEvent.keyboard('[Enter]');
  expect(screen.getByRole('listbox')).toBeInTheDocument();
  await userEvent.keyboard('[Enter]');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  await userEvent.keyboard('[Space]');
  expect(screen.getByRole('listbox')).toBeInTheDocument();

  const option1 = screen.getByRole('option', { name: 'Apple' });
  const option2 = screen.getByRole('option', { name: 'Banana' });
  expect(option1).toHaveAttribute('data-state', 'checked');
  expect(option2).toHaveAttribute('data-state', 'unchecked');
  expect(option1).toHaveAttribute('data-highlighted');
  expect(option2).not.toHaveAttribute('data-highlighted');
  await userEvent.keyboard('[ArrowDown]');
  expect(option1).not.toHaveAttribute('data-highlighted');
  expect(option2).toHaveAttribute('data-highlighted');

  await userEvent.keyboard('[Enter]');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(select).toHaveTextContent('Banana');
});

test('unknown value', async () => {
  render(<UnknownSelect />);
  const input = screen.getByRole('combobox');
  expect(input).toHaveTextContent('grapes');

  await userEvent.click(input);
  expect(screen.getAllByRole('option')).toHaveLength(3);
});

test('unknown value', async () => {
  render(<EmptySelect />);
  const input = screen.getByRole('combobox');
  expect(input).toHaveTextContent('Placeholder');

  await userEvent.click(input);
  expect(screen.getAllByRole('option')).toHaveLength(2);

  await userEvent.keyboard('[Enter]');
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  expect(input).toHaveTextContent('Apple');

  await userEvent.click(input);
  expect(screen.getAllByRole('option')).toHaveLength(3);
});

test('readonly mode', () => {
  render(<Select />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('combobox')).toBeDisabled();
});

test('disabled mode', () => {
  render(<Select disabled={true} />);
  expect(screen.getByRole('combobox')).toBeDisabled();
});
