import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const seperator = style({
  backgroundColor: vars.color.n200,
  selectors: {
    '&[data-orientation="horizontal"]': {
      height: 1,
      width: '100%',
      marginBlock: vars.size.s4
    },
    '&[data-orientation="vertical"]': {
      height: '100%',
      width: 1,
      marginInline: vars.size.s4
    }
  }
});
