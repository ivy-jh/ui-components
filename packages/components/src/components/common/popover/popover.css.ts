import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '@/styles/keyframes.css';
import { vars } from '@/styles/theme.css';
import { createVar, style } from '@vanilla-extract/css';

const contentBg = createVar();

export const content = style({
  vars: {
    [contentBg]: vars.color.background
  },
  borderRadius: vars.border.r2,
  maxWidth: `calc(var(--radix-popover-content-available-width) - 2 * ${vars.size.s2})`,
  backgroundColor: contentBg,
  boxShadow: vars.shadow.popover,
  animationDuration: '200ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  color: vars.color.body,
  padding: vars.size.s2,
  selectors: {
    '&[data-state="open"][data-side="top"]': {
      animationName: slideDownAndFade
    },
    '&[data-state="open"][data-side="right"]': {
      animationName: slideLeftAndFade
    },
    '&[data-state="open"][data-side="bottom"]': {
      animationName: slideUpAndFade
    },
    '&[data-state="open"][data-side="left"]': {
      animationName: slideRightAndFade
    }
  },
  '@media': {
    '(prefers-reduced-motion)': {
      animation: 'none'
    }
  }
});

export const arrow = style({
  fill: contentBg
});

export const close = style({
  borderRadius: '50%',
  position: 'absolute',
  top: vars.size.s2,
  right: vars.size.s2
});
