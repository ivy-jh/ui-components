import { style } from '@vanilla-extract/css';
import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';

export const textarea = style({
  all: 'unset',
  display: 'flex',
  borderRadius: vars.border.r1,
  border: vars.dynamic.inputBorder,
  background: vars.color.n25,
  fontSize: 12,
  lineHeight: '14px',
  color: vars.color.body,
  textAlign: 'start',
  padding: vars.padding.input,
  width: `calc(100% - 2 * ${vars.padding.input} - 2px)`,
  resize: 'vertical',
  whiteSpace: 'pre-wrap',
  ':disabled': disabled,
  ':focus': {
    border: vars.border.active
  }
});
