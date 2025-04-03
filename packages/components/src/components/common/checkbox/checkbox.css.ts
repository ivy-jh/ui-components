import { style } from '@vanilla-extract/css';
import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';

export const checkboxRoot = style({
  backgroundColor: vars.color.n25,
  borderRadius: vars.border.r1,
  border: vars.border.basic,
  width: 17,
  height: 17,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: vars.color.p50,
    border: vars.border.active
  },
  ':focus-visible': {
    boxShadow: vars.shadow.focus,
    outline: 'none'
  },
  ':disabled': {
    ...disabled,
    border: vars.border.basic
  },
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: vars.color.p50,
      border: vars.border.active
    }
  }
});

export const checkboxIndicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  color: vars.color.p300
});
