import { composeStory } from '@storybook/react';
import { render, screen } from 'test-utils';
import Meta, { BadgeArea, Default } from './inputBadge.stories';
import { inputBadge, inputBadgeText } from './inputBadge.css';

const InputBadge = composeStory(Default, Meta);
const InputBadgeArea = composeStory(BadgeArea, Meta);

test('InputBadge', () => {
  render(<InputBadge />);
  expect(screen.getByText('<%= ivy.log.info() %>')).toHaveClass(inputBadge);
  expect(screen.getByText('demoData')).toHaveClass(inputBadge);
  expect(screen.getByText('logic.demoLogic')).toHaveClass(inputBadge);
  expect(screen.getByText('noBadge1')).toHaveClass(inputBadgeText);
  const expBadge = screen.getByText('expression');
  expect(expBadge).toHaveClass(inputBadge);
  const expBadgeIcon = expBadge.parentElement?.querySelector('i.ivy-start-program');
  expect(expBadgeIcon).toBeVisible();
});

test('InputBadgeArea', () => {
  render(<InputBadgeArea />);
  expect(screen.getByText('<%= ivy.log.info() %>')).toHaveClass(inputBadge);
  expect(screen.getByText('demoData')).toHaveClass(inputBadge);
  expect(screen.getByText('logic.demoLogic')).toHaveClass(inputBadge);
  expect(screen.getByText('noBadge1')).toHaveClass(inputBadgeText);
  expect(screen.getAllByRole('row')).toHaveLength(2);
});
