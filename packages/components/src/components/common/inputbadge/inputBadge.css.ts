import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const inputBadgeOutput = style({
  display: 'block',
  borderRadius: vars.border.r1,
  border: vars.dynamic.inputBorder,
  background: vars.color.n25,
  fontSize: '12px',
  lineHeight: '12px',
  color: vars.color.body,
  textAlign: 'start',
  padding: vars.padding.input,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  minHeight: '14px',
  width: `calc(100% - 2 * ${vars.padding.input} - 2px)`
});

export const inputBadge = style({
  display: 'inline-flex',
  color: vars.color.body,
  backgroundColor: vars.color.n75,
  borderRadius: vars.border.r1,
  userSelect: 'none',
  border: vars.border.basic,
  padding: '2px'
});

export const inputBadgeLine = style({
  height: '20px',
  whiteSpace: 'pre-wrap'
});

export const inputBadgeIcon = style({
  display: 'inline-block',
  width: '1em',
  height: '1em',
  verticalAlign: 'bottom'
});

export const inputBadgeText = style({
  alignSelf: 'center'
});
