import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { AddRemove } from './footer.stories';

const Table = composeStory(AddRemove, Meta);

test('add', async () => {
  render(<Table />);
  expect(screen.getAllByRole('row')).toHaveLength(9);
  expect(screen.queryByRole('button', { name: 'Remove row' })).not.toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: 'Add row' }));
  expect(screen.getAllByRole('row')).toHaveLength(10);
});

test('remove', async () => {
  render(<Table />);
  expect(screen.queryByRole('button', { name: 'Remove row' })).not.toBeInTheDocument();
  const row = screen.getAllByRole('row')[2];
  expect(row).toHaveTextContent('Abe45');

  await userEvent.click(row);
  const removeBtn = screen.getByRole('button', { name: 'Remove row' });
  expect(removeBtn).toBeInTheDocument();

  await userEvent.click(removeBtn);
  expect(screen.getAllByRole('row')).toHaveLength(8);
  expect(screen.getAllByRole('row')[2]).toHaveTextContent('Monserrat44');
});
