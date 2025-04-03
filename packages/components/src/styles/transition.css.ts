import { style } from '@vanilla-extract/css';

export const transitionColors = style({
  transitionProperty: 'color,background-color,border-color,text-decoration-color,fill,stroke',
  transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
  transitionDuration: '.15s'
});
