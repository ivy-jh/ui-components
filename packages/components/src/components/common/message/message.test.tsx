import { composeStory } from '@storybook/react';
import { render, screen } from 'test-utils';
import Meta, { Default, WithLink } from './message.stories';

const Message = composeStory(Default, Meta);
const LinkMessage = composeStory(WithLink, Meta);

test('message', () => {
  render(<Message />);
  expect(screen.getByRole('paragraph')).not.toHaveAttribute('data-state');
  expect(screen.getByRole('paragraph')).toHaveTextContent('This is a message');
});

test('description', () => {
  render(<Message variant='description' />);
  expect(screen.getByRole('paragraph')).toHaveAttribute('data-state', 'description');
});

test('info', () => {
  render(<Message variant='info' />);
  expect(screen.getByRole('paragraph')).toHaveAttribute('data-state', 'info');
});

test('warning', () => {
  render(<Message variant='warning' />);
  expect(screen.getByRole('paragraph')).toHaveAttribute('data-state', 'warning');
});

test('error', () => {
  render(<Message variant='error' />);
  expect(screen.getByRole('paragraph')).toHaveAttribute('data-state', 'error');
});

test('link', async () => {
  render(<LinkMessage />);
  expect(screen.getByRole('link')).toHaveTextContent('embedded');
});
