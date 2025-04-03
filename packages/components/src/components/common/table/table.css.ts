import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const root = style({
  borderRadius: vars.border.r1,
  overflow: 'auto',
  border: vars.border.basic
});

export const table = style({
  overflow: 'auto',
  maxHeight: '100%',
  width: '100%',
  maxWidth: '100%',
  borderSpacing: 0,
  background: vars.color.n25,
  tableLayout: 'fixed',
  borderCollapse: 'collapse',
  fontSize: '12px',
  ':focus-visible': {
    outline: 'none',
    border: vars.border.active
  }
});

export const header = style({
  textAlign: 'left',
  borderBottom: vars.border.basic
});

export const body = style({
  borderBottom: vars.border.basic,
  ':last-child': {
    borderBottom: 'none'
  }
});

export const footer = style({
  backgroundColor: vars.color.n100
});

export const row = style({
  borderBottom: vars.border.basic,
  ':last-child': {
    borderBottom: 'none'
  }
});

export const head = style({
  height: 20,
  padding: vars.size.s2,
  fontWeight: 'normal',
  verticalAlign: 'middle'
});

export const cell = style({
  verticalAlign: 'middle',
  overflow: 'hidden',
  padding: vars.size.s2,
  selectors: {
    [`&:has(.ui-table-edit-cell)`]: {
      padding: 0
    },
    [`&:has(.ui-table-edit-cell:focus-visible), &:has(.ui-table-edit-cell:focus-within)`]: {
      border: `1px solid black`
    }
  }
});
