import { style } from '@vanilla-extract/css';
import { slideDownAndFade, slideLeftAndFade, slideRightAndFade, slideUpAndFade } from '@/styles/keyframes.css';
import { vars } from '@/styles/theme.css';

export const tooltipContent = style({
  color: vars.color.body,
  borderRadius: vars.border.r2,
  padding: `${vars.size.s1} ${vars.size.s2}`,
  backgroundColor: vars.color.n25,
  boxShadow: vars.shadow.editor,
  userSelect: 'none',
  animationDuration: '200ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  selectors: {
    '&[data-state="delayed-open"][data-side="top"]': {
      animationName: slideDownAndFade
    },
    '&[data-state="delayed-open"][data-side="right"]': {
      animationName: slideLeftAndFade
    },
    '&[data-state="delayed-open"][data-side="bottom"]': {
      animationName: slideUpAndFade
    },
    '&[data-state="delayed-open"][data-side="left"]': {
      animationName: slideRightAndFade
    }
  },
  '@media': {
    '(prefers-reduced-motion)': {
      animation: 'none'
    }
  }
});
