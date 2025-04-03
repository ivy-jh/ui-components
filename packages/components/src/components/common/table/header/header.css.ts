import { vars } from '@/styles/theme.css';
import { createVar, style } from '@vanilla-extract/css';

export const sortHead = style({
  width: '100%'
});

export const sortButton = style({
  color: vars.color.n300,
  ':hover': {
    color: vars.color.body
  },
  selectors: {
    '&[data-sort-state="desc"]': {
      transform: 'rotate(180deg)'
    },
    '&:not([data-sort-state="false"])': {
      color: vars.color.body
    }
  }
});

export const expandButton = style({
  transform: 'rotate(90deg)',
  selectors: {
    '&[data-state=collapsed]': {
      transform: 'rotate(0deg)'
    }
  }
});

const resizerBg = createVar();

export const resizer = style({
  width: 5,
  height: 18,
  cursor: 'col-resize',
  userSelect: 'none',
  touchAction: 'none',
  vars: {
    [resizerBg]: vars.color.n200
  },
  selectors: {
    '&:where(:hover, [data-resize-state="active"])': {
      vars: {
        [resizerBg]: vars.color.p300
      }
    }
  }
});

export const resizerLine = style({
  width: 1,
  backgroundColor: resizerBg
});
