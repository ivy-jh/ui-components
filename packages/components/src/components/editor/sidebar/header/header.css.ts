import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const header = style({
  backgroundColor: vars.color.background,
  paddingInline: vars.size.s3,
  gap: vars.size.s2,
  borderBottom: vars.border.basic,
  fontSize: '14px',
  fontWeight: 500,
  height: 48,
  flex: '0 0 48px'
});

export const headerLeft = style({
  minWidth: 0,
  flex: 1
});

export const headerTitle = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

export const headerIcon = style({
  selectors: {
    [`${header} &`]: {
      fontSize: '16px'
    }
  }
});

export const headerMessage = style({
  padding: `${vars.size.s1} ${vars.size.s4}`,
  borderBottom: vars.border.basic,
  maxHeight: `calc(2em + 3 * ${vars.size.s1})`,
  overflow: 'auto'
});
