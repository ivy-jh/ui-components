import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '@/styles/keyframes.css';
import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const content = style({
  border: vars.border.basic,
  borderRadius: vars.border.r2,
  maxWidth: `calc(var(--radix-popover-content-available-width) - 2 * ${vars.size.s2})`,
  minWidth: '8rem',
  backgroundColor: vars.color.background,
  boxShadow: vars.shadow.popover,
  animationDuration: '200ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  color: vars.color.body,
  padding: vars.size.s1,
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

export const menuItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.size.s1,
  userSelect: 'none',
  padding: `${vars.size.s1} ${vars.size.s2}`,
  borderRadius: vars.border.r1,
  backgroundColor: 'transparent',
  outline: 0,
  ':focus': {
    backgroundColor: vars.color.p50
  },
  selectors: {
    '&[data-disabled]': {
      pointerEvents: 'none',
      opacity: '.5'
    },
    '&[data-state="open"]': {
      backgroundColor: vars.color.p50
    }
  }
});

export const menuItemSubTriggerChevron = style({
  marginLeft: 'auto'
});

export const menuItemWithIndicator = style({
  paddingLeft: '1.5rem'
});

export const menuItemIndicator = style({
  display: 'flex',
  position: 'absolute',
  left: '.7rem',
  alignItems: 'center',
  justifyContent: 'center',
  width: 15
});

export const menuItemRadioIndicator = style({
  '::after': {
    content: '',
    display: 'block',
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: vars.color.body
  }
});

export const label = style({
  fontWeight: 600,
  paddingBlock: vars.size.s1,
  paddingInline: vars.size.s2
});

export const separator = style({
  height: 1,
  backgroundColor: vars.color.n200,
  marginBlock: vars.size.s1,
  marginInline: `calc(-1 * ${vars.size.s1})`
});

export const shortcut = style({
  opacity: '.6',
  letterSpacing: '.1em',
  fontSize: '.75rem',
  lineHeight: '1rem',
  marginLeft: 'auto'
});
