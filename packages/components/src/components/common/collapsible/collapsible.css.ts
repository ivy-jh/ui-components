import { vars } from '@/styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

export const root = style({
  border: `1px solid ${vars.color.n100}`,
  borderRadius: vars.border.r2
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.size.s2,
  overflow: 'hidden'
});

export const trigger = style({
  all: 'unset',
  flex: '0 1 100%',
  padding: vars.size.s2,
  cursor: 'pointer',
  ':focus-visible': {
    border: vars.border.active
  },
  selectors: {
    [`${root}[data-state='open'] &`]: {
      color: vars.color.p300,
      fontWeight: 600
    }
  }
});

export const triggerChevron = style({
  padding: vars.size.s2,
  cursor: 'pointer',
  transition: 'transform 200ms cubic-bezier(0.87, 0, 0.13, 1)',
  selectors: {
    '&[data-state="open"]': {
      transform: 'rotate(90deg)'
    }
  }
});

export const state = style({
  flex: '0 0 auto',
  selectors: {
    [`${root}[data-state='open'] &`]: {
      display: 'none'
    }
  }
});

export const controls = style({
  selectors: {
    [`${root}[data-state='closed'] &`]: {
      display: 'none'
    }
  }
});

const collapsableSlideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-collapsible-content-height)' }
});

const collapsableSlideUp = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: 0 }
});

export const content = style({
  overflow: 'hidden',
  animationDuration: '200ms',
  animationTimingFunction: 'cubic-bezier(0.87, 0, 0.13, 1)',
  willChange: 'height',
  '@media': {
    '(prefers-reduced-motion)': {
      animation: 'none'
    }
  },
  selectors: {
    '&[data-state="open"]': {
      animationName: collapsableSlideDown
    },
    '&[data-state="closed"]': {
      animationName: collapsableSlideUp
    }
  }
});

export const contentData = style({
  padding: vars.size.s2,
  paddingBlockStart: 0,
  overflow: 'auto'
});
