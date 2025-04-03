import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default } from './edit.stories';

const Table = composeStory(Default, Meta);

test('select', async () => {
  render(<Table />);
  const select = screen.getAllByRole('combobox')[0];
  expect(select).toHaveTextContent('Success');

  await userEvent.click(select);
  expect(screen.getByRole('listbox')).toBeInTheDocument();

  await userEvent.keyboard('[ArrowDown]');
  await userEvent.keyboard('[Enter]');
  expect(screen.getAllByRole('row')[1]).toHaveAttribute('data-state', 'selected');
  expect(screen.getAllByRole('combobox')[0]).toHaveTextContent('Failed');
});

test('input', async () => {
  render(<Table />);
  const input = screen.getAllByRole('textbox')[0];
  expect(input).toHaveValue('ken99@yahoo.com');

  await userEvent.click(input);
  await userEvent.keyboard('1');
  await userEvent.tab();
  expect(screen.getAllByRole('row')[1]).toHaveAttribute('data-state', 'selected');
  expect(screen.getAllByRole('textbox')[0]).toHaveValue('ken99@yahoo.com1');
});

test('combobox', async () => {
  render(<Table />);
  const combobox = screen.getAllByRole('combobox')[1];
  expect(combobox).toHaveValue('316');

  await userEvent.click(combobox);
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await userEvent.keyboard('[ArrowDown]');
  await userEvent.keyboard('[Enter]');
  expect(screen.getAllByRole('row')[1]).toHaveAttribute('data-state', 'selected');
  expect(screen.getAllByRole('combobox')[1]).toHaveValue('123');
});

const setupTable = async () => {
  render(<Table />);
  const rows = screen.getAllByRole('row');
  const user = userEvent.setup();
  expect(rows[1]).toHaveAttribute('data-state', 'unselected');
  await user.click(rows[1]);
  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'unselected');
  return { rows, user };
};

const selectRowAndNavigate = async (rows: HTMLElement[], user: ReturnType<typeof userEvent.setup>, colIndex: number) => {
  // Navigate to the correct column
  for (let i = 0; i <= colIndex; i++) {
    await user.keyboard('[Tab]');
  }
  const tagName = colIndex === 0 ? 'button' : 'input';
  expect(rows[1].getElementsByTagName('td')[colIndex].getElementsByTagName(tagName)[0]).toHaveFocus();

  // Move down two rows
  await user.keyboard('[ArrowDown]');
  await user.keyboard('[ArrowDown]');

  expect(rows[1]).toHaveAttribute('data-state', 'unselected');
  expect(rows[3]).toHaveAttribute('data-state', 'selected');
  expect(rows[3].getElementsByTagName('td')[colIndex].getElementsByTagName(tagName)[0]).toHaveFocus();

  // Check jump over disabled select cell
  await user.keyboard('[ArrowDown]');
  await user.keyboard('[ArrowDown]');
  await user.keyboard('[ArrowDown]');

  expect(rows[8]).toHaveAttribute('data-state', 'selected');
  expect(rows[3]).toHaveAttribute('data-state', 'unselected');
  expect(rows[8].getElementsByTagName('td')[colIndex].getElementsByTagName(tagName)[0]).toHaveFocus();

  await user.keyboard('[ArrowUp]');
  expect(rows[6]).toHaveAttribute('data-state', 'selected');
  expect(rows[8]).toHaveAttribute('data-state', 'unselected');
  expect(rows[6].getElementsByTagName('td')[colIndex].getElementsByTagName(tagName)[0]).toHaveFocus();
};

test('keyboard navigation with arrow for select cell', async () => {
  const { rows, user } = await setupTable();
  await selectRowAndNavigate(rows, user, 0);
});

test('keyboard navigation with arrow for input cell', async () => {
  const { rows, user } = await setupTable();
  await selectRowAndNavigate(rows, user, 1);
});

test('keyboard navigation with arrow for combo cell', async () => {
  const { rows, user } = await setupTable();
  await selectRowAndNavigate(rows, user, 2);
});

test('open select menu with enter and nav with arrow', async () => {
  const { rows, user } = await setupTable();
  const select = screen.getAllByRole('combobox')[0];
  expect(select).toHaveTextContent('Success');
  await user.keyboard('[Tab]');
  expect(rows[1].getElementsByTagName('td')[0].getElementsByTagName('button')[0]).toHaveFocus();
  await user.keyboard('[Enter]');
  expect(screen.getByRole('listbox')).toBeInTheDocument();

  await userEvent.keyboard('[ArrowDown]');
  await userEvent.keyboard('[Enter]');
  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(screen.getAllByRole('combobox')[0]).toHaveTextContent('Failed');
});

test('open combobox menu with enter and nav with arrow', async () => {
  const { rows, user } = await setupTable();
  const combobox = screen.getAllByRole('combobox')[1];
  expect(combobox).toHaveValue('316');
  await user.keyboard('[Tab]');
  await user.keyboard('[Tab]');
  await user.keyboard('[Tab]');
  expect(rows[1].getElementsByTagName('td')[2].getElementsByTagName('input')[0]).toHaveFocus();
  await user.keyboard('[Enter]');
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await userEvent.keyboard('[ArrowDown]');
  await userEvent.keyboard('[Enter]');
  expect(screen.getAllByRole('row')[1]).toHaveAttribute('data-state', 'selected');
  expect(screen.getAllByRole('combobox')[1]).toHaveValue('456');
});
