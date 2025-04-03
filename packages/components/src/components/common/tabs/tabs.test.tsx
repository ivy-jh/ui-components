import { composeStory } from '@storybook/react';
import { render, screen, userEvent } from 'test-utils';
import Meta, { Default } from './tabs.stories';

const Tabs = composeStory(Default, Meta);

test('toggle', async () => {
  render(<Tabs />);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');
  const func = screen.getByRole('tab', { name: /Function/ });
  await userEvent.click(func);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Function list');

  const attr = screen.getByRole('tab', { name: /Attribute/ });
  await userEvent.click(attr);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');
});

test('toggled with keyboard', async () => {
  render(<Tabs />);

  const attr = screen.getByRole('tab', { name: /Attribute/ });
  const func = screen.getByRole('tab', { name: /Function/ });

  await userEvent.tab();
  expect(attr).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');

  await userEvent.keyboard('[ArrowRight]');
  expect(func).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Function list');

  await userEvent.keyboard('[ArrowLeft]');
  expect(attr).toHaveFocus();
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Attribute list');
});
