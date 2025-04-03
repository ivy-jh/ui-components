/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default, CustomValue, Lazy, Search } from './tree.stories';

const Tree = composeStory(Default, Meta);
const CustomTree = composeStory(CustomValue, Meta);
const LazyTree = composeStory(Lazy, Meta);
const SearchTree = composeStory(Search, Meta);

test('tree', async () => {
  render(<Tree />);
  expect(screen.getAllByRole('row')).toHaveLength(7);
  await userEvent.click(screen.getAllByRole('button', { name: 'Collapse row' })[0]);
  expect(screen.getAllByRole('row')).toHaveLength(3);
  await userEvent.click(screen.getByRole('button', { name: 'Expand tree' }));
  expect(screen.getAllByRole('row')).toHaveLength(7);
});

test('custom', async () => {
  render(<CustomTree />);
  expect(screen.getAllByRole('row')[1]).toHaveTextContent('rootScalarMore infovalue');
});

test('lazy', async () => {
  render(<LazyTree />);
  expect(screen.getAllByRole('row')).toHaveLength(8);
  await userEvent.click(screen.getAllByRole('button', { name: 'Expand row' }).at(-1)!);
  expect(screen.getAllByRole('row')).toHaveLength(9);
  await userEvent.click(screen.getAllByRole('button', { name: 'Expand row' }).at(-1)!);
  expect(screen.getAllByRole('row')).toHaveLength(10);
  await userEvent.click(screen.getAllByRole('button', { name: 'Expand row' }).at(-1)!);
  expect(screen.getAllByRole('row')).toHaveLength(11);
  await userEvent.click(screen.getAllByRole('button', { name: 'Expand row' }).at(-1)!);
  expect(screen.getAllByRole('row')).toHaveLength(12);
});

test('search', async () => {
  render(<SearchTree />);
  expect(screen.getAllByRole('row')).toHaveLength(7);
  const search = screen.getByRole('textbox');
  await userEvent.type(search, 'user');
  expect(screen.getAllByRole('row')).toHaveLength(4);

  await userEvent.clear(search);
  await userEvent.type(search, '1234');
  expect(screen.getAllByRole('row')).toHaveLength(3);

  await userEvent.clear(search);
  await userEvent.type(search, 'unknown');
  expect(screen.getAllByRole('row')).toHaveLength(1);
});
