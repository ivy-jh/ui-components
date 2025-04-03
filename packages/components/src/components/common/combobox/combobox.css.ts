import { style } from '@vanilla-extract/css';
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '@/styles/keyframes.css';
import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';

export const content = style({
  maxHeight: '20rem',
  width: 'var(--radix-popper-anchor-width)',
  backgroundColor: vars.color.background,
  padding: 0,
  zIndex: 10,
  boxShadow: vars.shadow.editor,
  borderRadius: vars.border.r2,
  overflow: 'auto',
  position: 'relative',
  border: vars.border.basic,
  animationDuration: '200ms',
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
      animation: 'nome'
    }
  }
});

export const item = style({
  padding: vars.size.s2,
  outline: 0,
  userSelect: 'none',
  selectors: {
    '&[data-highlighted]': {
      background: vars.color.p50
    },
    '&[data-state="checked"]': {
      background: vars.color.p300,
      color: vars.color.background
    },
    '&[data-disabled]': disabled
  }
});
