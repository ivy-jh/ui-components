import { style } from '@vanilla-extract/css';
import { vars } from '@/styles/theme.css';
import { recipe } from '@vanilla-extract/recipes';

export const panel = style({
  height: 'calc(100% - 40px)',
  color: vars.color.n800,
  margin: 20
});

export const panelIcon = recipe({
  base: {
    fontSize: 54,
    textAlign: 'center'
  },
  variants: {
    mode: {
      row: { fontSize: '20px' },
      column: { fontSize: '54px' }
    }
  }
});

export const panelMessage = style({
  fontSize: '14px',
  textAlign: 'center'
});
