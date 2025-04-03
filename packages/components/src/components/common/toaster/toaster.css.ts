import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';

export const toaster = style({
  backgroundColor: vars.color.n75
});

export const description = style({
  color: vars.color.n800
});

export const error = style({
  borderColor: vars.color.error
});

export const warning = style({
  borderColor: vars.color.warning
});

export const success = style({
  borderColor: vars.color.success
});

export const closeBtn = style({
  backgroundColor: vars.color.background,
  color: 'var(--normal-text)',
  border: '1px solid var(--normal-border)',
  selectors: {
    [`${toaster} &:hover`]: {
      backgroundColor: vars.color.n75,
      borderColor: 'var(--normal-border)'
    }
  }
});
