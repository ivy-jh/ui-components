import { composeStory } from '@storybook/react';
import { render, screen } from 'test-utils';
import Meta, { Default, WithMessages } from './header.stories';
import { IvyIcons } from '@axonivy/ui-icons';

const Header = composeStory(Default, Meta);
const MessageHeader = composeStory(WithMessages, Meta);

test('header', async () => {
  render(<Header title='test' icon={IvyIcons.InfoCircle} />);
  expect(screen.getByText('test')).toBeInTheDocument();
  expect(screen.getByRole('button')).toHaveAccessibleName('Help');
});

test('messages', async () => {
  render(<MessageHeader />);
  expect(screen.getAllByRole('paragraph')).toHaveLength(3);
  expect(screen.getAllByRole('paragraph')[0]).toHaveAttribute('data-state', 'error');
  expect(screen.getAllByRole('paragraph')[0]).toHaveTextContent('Parameter code: Variable');
});
