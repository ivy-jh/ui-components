import { style } from '@vanilla-extract/css';
import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';

export const radioGroup = style({
  display: 'flex',
  gap: vars.size.s4,
  selectors: {
    '&[data-orientation="vertical"]': {
      flexDirection: 'column',
      gap: vars.size.s2
    }
  }
});

export const radioGroupItem = style({
  all: 'unset',
  backgroundColor: vars.color.n25,
  width: 15,
  height: 15,
  borderRadius: '100%',
  border: vars.border.basic,
  flexShrink: 0,
  ':hover': {
    backgroundColor: vars.color.p50,
    border: vars.border.active
  },
  ':focus-visible': {
    boxShadow: vars.shadow.focus
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

export const radioGroupIdicator = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '::after': {
    content: '',
    display: 'block',
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: vars.color.p300
  }
});
