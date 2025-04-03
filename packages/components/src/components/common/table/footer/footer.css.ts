import { vars } from '@/styles/theme.css';
import { transitionColors } from '@/styles/transition.css';
import { style } from '@vanilla-extract/css';

export const addRowBlock = style({
  marginBlockStart: vars.size.s1
});

export const addRowBtn = style({
  backgroundColor: vars.color.background,
  color: vars.color.p300,
  width: 14,
  height: 14,
  fontSize: 14,
  borderRadius: 10,
  ':hover': {
    color: vars.color.p300
  }
});

export const addRowLine = style([
  transitionColors,
  {
    height: 2,
    width: '100%',
    backgroundColor: vars.color.n500,
    selectors: {
      [`${addRowBtn}:hover ~ &`]: {
        backgroundColor: vars.color.p300
      }
    }
  }
]);
