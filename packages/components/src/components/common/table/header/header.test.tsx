import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { FilterResizeSortTable } from './header.stories';

const Table = composeStory(FilterResizeSortTable, Meta);

test('filter', async () => {
  render(<Table />);
  const search = screen.getByRole('textbox');
  expect(screen.getAllByRole('row')).toHaveLength(9);

  await userEvent.type(search, 'success');
  expect(screen.getAllByRole('row')).toHaveLength(4);

  await userEvent.clear(search);
  await userEvent.type(search, 'ken');
  expect(screen.getAllByRole('row')).toHaveLength(2);

  await userEvent.clear(search);
  await userEvent.type(search, '3');
  expect(screen.getAllByRole('row')).toHaveLength(4);
});

test('no results', async () => {
  render(<Table />);
  const search = screen.getByRole('textbox');
  await userEvent.type(search, 'adsf');
  expect(screen.getAllByRole('row')).toHaveLength(2);
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('No results');
});

test('sort', async () => {
  render(<Table />);
  expectSort(['Status', 'success', 'success', 'processing', 'success', 'failed', 'pending', 'processing', 'NaN']);
  const statusSort = screen.getByRole('button', { name: 'Sort by Status' });
  await userEvent.click(statusSort);
  expectSort(['Status', 'failed', 'pending', 'processing', 'processing', 'success', 'success', 'success', 'NaN']);
  await userEvent.click(statusSort);
  expectSort(['Status', 'NaN', 'success', 'success', 'success', 'processing', 'processing', 'pending', 'failed']);

  const emailSort = screen.getByRole('button', { name: 'Sort by Email' });
  await userEvent.click(emailSort);
  expectSort(['Email', 'Abe', 'Monserrat', 'Silas', 'carmella', 'hans', 'ken', 'lukas', 'NaN']);
  await userEvent.click(emailSort);
  expectSort(['Email', 'NaN', 'lukas', 'ken', 'hans', 'carmella', 'Silas', 'Monserrat', 'Abe']);
});

const expectSort = (textContent: string[]) => {
  screen.getAllByRole('row').forEach((row, index) => {
    expect(row).toHaveTextContent(textContent[index]);
  });
};
