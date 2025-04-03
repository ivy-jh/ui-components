import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Select, Message, Reorder, MultiSelectWithReorder } from './row.stories';

const SelectTable = composeStory(Select, Meta);
const MultiSelectWithReorderTable = composeStory(MultiSelectWithReorder, Meta);
const MessageTable = composeStory(Message, Meta);
const ReorderTable = composeStory(Reorder, Meta);

test('select', async () => {
  render(<SelectTable />);
  const row = screen.getAllByRole('row')[1];
  expect(row).toHaveAttribute('data-state', 'unselected');
  expect(screen.getByTitle('selected-row')).not.toHaveTextContent('Selected Row: ken99@yahoo.com');
  await userEvent.click(row);
  expect(row).toHaveAttribute('data-state', 'selected');
  expect(screen.getByTitle('selected-row')).toHaveTextContent('Selected Row: ken99@yahoo.com');
});

test('ctrl select', async () => {
  render(<MultiSelectWithReorderTable />);
  const rows = screen.getAllByRole('row');
  expect(rows[1]).toHaveAttribute('data-state', 'unselected');
  expect(rows[3]).toHaveAttribute('data-state', 'unselected');
  const user = userEvent.setup();
  await user.click(rows[1]);
  expect(rows[1]).toHaveAttribute('data-state', 'selected');

  await user.keyboard('[ControlLeft>]');
  await user.click(rows[3]);

  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'unselected');
  expect(rows[3]).toHaveAttribute('data-state', 'selected');
});

test('shift select', async () => {
  render(<MultiSelectWithReorderTable />);
  const rows = screen.getAllByRole('row');
  expect(rows[1]).toHaveAttribute('data-state', 'unselected');
  expect(rows[3]).toHaveAttribute('data-state', 'unselected');
  const user = userEvent.setup();
  await user.click(rows[1]);
  expect(rows[1]).toHaveAttribute('data-state', 'selected');

  await user.keyboard('[ShiftLeft>]');
  await user.click(rows[3]);

  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'selected');
  expect(rows[3]).toHaveAttribute('data-state', 'selected');

  await user.click(rows[2]);
  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'selected');
  expect(rows[3]).toHaveAttribute('data-state', 'unselected');
});

test('ctrl+shift select', async () => {
  render(<MultiSelectWithReorderTable />);
  const rows = screen.getAllByRole('row');
  const user = userEvent.setup();
  await user.click(rows[1]);
  expect(rows[1]).toHaveAttribute('data-state', 'selected');

  await user.keyboard('[ControlLeft>]');
  await user.click(rows[3]);
  expect(rows[3]).toHaveAttribute('data-state', 'selected');

  await user.keyboard('[ShiftLeft>]');
  await user.click(rows[5]);

  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'unselected');
  expect(rows[3]).toHaveAttribute('data-state', 'selected');
  expect(rows[4]).toHaveAttribute('data-state', 'selected');
  expect(rows[5]).toHaveAttribute('data-state', 'selected');

  await user.click(rows[4]);

  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'unselected');
  expect(rows[3]).toHaveAttribute('data-state', 'selected');
  expect(rows[4]).toHaveAttribute('data-state', 'selected');
  expect(rows[5]).toHaveAttribute('data-state', 'selected');
});

test('keyboard select', async () => {
  render(<MultiSelectWithReorderTable />);
  const rows = screen.getAllByRole('row');
  const user = userEvent.setup();
  await user.keyboard('[Tab]');
  await user.keyboard('[ArrowDown]');
  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'unselected');
  await user.keyboard('[ArrowDown]');
  expect(rows[1]).toHaveAttribute('data-state', 'unselected');
  expect(rows[2]).toHaveAttribute('data-state', 'selected');
});

test('keyboard shift select', async () => {
  render(<MultiSelectWithReorderTable />);
  const rows = screen.getAllByRole('row');
  const user = userEvent.setup();
  await user.keyboard('[Tab]');
  await user.keyboard('[ArrowDown]');
  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'unselected');
  await user.keyboard('[ShiftLeft>][ArrowDown]');
  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveAttribute('data-state', 'selected');
});

test('keyboard alt reorder', async () => {
  render(<MultiSelectWithReorderTable />);
  const rows = screen.getAllByRole('row');
  const user = userEvent.setup();
  await user.keyboard('[Tab]');
  await user.keyboard('[ArrowDown]');
  expect(rows[1]).toHaveAttribute('data-state', 'selected');
  expect(rows[1]).toHaveTextContent('successken99@yahoo.com');
  expect(rows[2]).toHaveAttribute('data-state', 'unselected');
  expect(rows[2]).toHaveTextContent('successAbe45@gmail.com');
  await user.keyboard('[AltLeft>][ArrowDown]');
  expect(rows[1]).toHaveAttribute('data-state', 'unselected');
  expect(rows[1]).toHaveTextContent('successAbe45@gmail.com');
  expect(rows[2]).toHaveAttribute('data-state', 'selected');
  expect(rows[2]).toHaveTextContent('successken99@yahoo.com');
});

test('message', async () => {
  render(<MessageTable />);
  const row = screen.getAllByRole('row')[4];
  expect(row).toHaveClass('ui-message-row');
  expect(row).toHaveTextContent('This is an error');
});

test('reorder', async () => {
  render(<ReorderTable />);
  const row = screen.getAllByRole('row')[1];
  expect(row).toHaveAttribute('draggable', 'true');
  expect(row).toHaveAttribute('data-drag-state', 'false');
  expect(row).toHaveAttribute('data-drop-target-state', 'false');
});
