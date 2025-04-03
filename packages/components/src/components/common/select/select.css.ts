import { style } from '@vanilla-extract/css';
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '@/styles/keyframes.css';
import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';

export const trigger = style({
  cursor: 'pointer',
  padding: vars.padding.input,
  fontSize: 12,
  height: 36,
  borderRadius: vars.border.r1,
  border: vars.dynamic.inputBorder,
  background: vars.color.n25,
  color: vars.color.body,
  display: 'inline-flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.size.s1,
  outline: 'none',
  width: '100%',
  userSelect: 'none',
  ':disabled': disabled,
  ':focus': {
    border: vars.border.active
  }
});

export const triggerIcon = style({
  fontSize: 16
});

export const scrollButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.size.s1
});

export const content = style({
  maxHeight: '20rem',
  width: 'var(--radix-popper-anchor-width)',
  backgroundColor: vars.color.background,
  padding: 0,
  zIndex: 10,
  boxShadow: vars.shadow.editor,
  borderRadius: vars.border.r2,
  overflow: 'hidden',
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

export const viewport = style({
  padding: vars.size.s1
});

export const label = style({
  padding: vars.size.s2,
  paddingLeft: '2rem',
  fontWeight: 'bold'
});

export const item = style({
  display: 'flex',
  position: 'relative',
  padding: vars.size.s2,
  paddingLeft: '2rem',
  alignItems: 'center',
  height: 15,
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

export const itemIcon = style({
  display: 'flex',
  position: 'absolute',
  left: '0.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  width: '0.875rem',
  height: '0.875rem'
});

export const seperator = style({
  marginBlock: vars.size.s1,
  marginInline: `calc(-1 * ${vars.size.s1})`,
  height: 1,
  backgroundColor: vars.color.n200
});
