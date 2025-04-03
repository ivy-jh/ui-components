import { vars } from '@/styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

export const enter = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate3d(-50%, -48%, 0) scale3d(0.95, 0.95, 0.95)'
  }
});

export const exit = keyframes({
  to: {
    opacity: 0,
    transform: 'translate3d(-50%, -48%, 0) scale3d(0.95, 0.95, 0.95)'
  }
});

export const enterOverlay = keyframes({
  '0%': {
    opacity: 0
  }
});

export const exitOverlay = keyframes({
  to: {
    opacity: 0
  }
});

export const overlay = style({
  animationName: enterOverlay,
  animationDuration: '.15s',
  backgroundColor: 'rgba(0, 0, 0, .8)',
  inset: 0,
  position: 'fixed',
  selectors: {
    '&[data-state="closed"]': {
      animationName: exitOverlay
    }
  },
  '@media': {
    '(prefers-reduced-motion)': {
      animation: 'none'
    }
  }
});

export const content = style({
  animationName: enter,
  animationDuration: '.15s',
  borderRadius: vars.border.r3,
  maxWidth: 425,
  boxShadow: vars.shadow.popover,
  padding: '20px',
  backgroundColor: vars.color.background,
  border: vars.border.basic,
  display: 'grid',
  gap: 20,
  width: '100%',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  selectors: {
    '&[data-state="closed"]': {
      animationName: exit
    }
  },
  '@media': {
    '(prefers-reduced-motion)': {
      animation: 'none'
    }
  }
});

export const contentClose = style({
  position: 'absolute',
  top: '1rem',
  right: '1rem'
});

export const header = style({});

export const title = style({
  margin: 0
});

export const description = style({
  margin: 0
});

export const footer = style({
  margin: 0
});
