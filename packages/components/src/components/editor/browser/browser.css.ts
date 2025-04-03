import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const fullHeight = style({
  height: '100%'
});

export const overflowAuto = style({
  overflow: 'auto'
});

export const overflowHidden = style({
  overflow: 'hidden'
});

export const info = style({
  color: vars.color.n500,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
});
