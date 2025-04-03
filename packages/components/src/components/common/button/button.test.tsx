import { composeStory } from '@storybook/react';
import { render, screen } from 'test-utils';
import Meta, { Default } from './button.stories';

const Button = composeStory(Default, Meta);

test('toggle', async () => {
  render(<Button toggle={undefined}>Button</Button>);
  const checkbox = screen.getByRole('button');
  expect(checkbox).not.toHaveAttribute('data-state');
  expect(checkbox).not.toHaveAttribute('aria-pressed');
});

test('toggle off', async () => {
  render(<Button toggle={false}>Button</Button>);
  const checkbox = screen.getByRole('button');
  expect(checkbox).toHaveAttribute('data-state', 'off');
  expect(checkbox).toHaveAttribute('aria-pressed', 'false');
});

test('toggle on', async () => {
  render(<Button toggle={true}>Button</Button>);
  const checkbox = screen.getByRole('button');
  expect(checkbox).toHaveAttribute('data-state', 'on');
  expect(checkbox).toHaveAttribute('aria-pressed', 'true');
});

test('readonly mode', () => {
  render(<Button />, { wrapperProps: { readonly: true } });
  expect(screen.getByRole('button')).not.toBeDisabled();
});

test('disabled mode', () => {
  render(<Button disabled={true} />);
  expect(screen.getByRole('button')).toBeDisabled();
});
