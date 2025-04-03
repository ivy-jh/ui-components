import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default } from './outline.stories';

const Outline = composeStory(Default, Meta);

test('click', async () => {
  let selection = undefined;
  let dblClick = false;
  render(<Outline onClick={id => (selection = id)} onDoubleClick={() => (dblClick = true)} />);
  await userEvent.click(screen.getByRole('row', { name: 'One Columns Container' }));
  expect(screen.getByRole('row', { name: 'One Columns Container' })).toHaveAttribute('data-state', 'selected');
  expect(selection).toBe('9');

  await userEvent.dblClick(screen.getByRole('row', { name: 'First Name' }));
  expect(screen.getByRole('row', { name: 'One Columns Container' })).toHaveAttribute('data-state', 'unselected');
  expect(screen.getByRole('row', { name: 'First Name' })).toHaveAttribute('data-state', 'selected');
  expect(selection).toBe('6');
  expect(dblClick).toBeTruthy();
});

test('filter', async () => {
  render(<Outline />);
  expect(screen.getAllByRole('row')).toHaveLength(19);

  await userEvent.type(screen.getByRole('textbox'), 'First Name');
  expect(screen.getAllByRole('row')).toHaveLength(4);

  await userEvent.clear(screen.getByRole('textbox'));
  await userEvent.type(screen.getByRole('textbox'), 'info');
  expect(screen.getAllByRole('row')).toHaveLength(2);
});

test('selection', async () => {
  const view = render(<Outline selection='4' />);
  expect(screen.getAllByRole('row')[3]).toHaveAttribute('data-state', 'selected');

  view.rerender(<Outline selection='5' />);
  expect(screen.getAllByRole('row')[3]).toHaveAttribute('data-state', 'unselected');
  expect(screen.getAllByRole('row')[4]).toHaveAttribute('data-state', 'selected');
});
