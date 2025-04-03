import { style } from '@vanilla-extract/css';
import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';
import { editCell } from '../table/edit/edit.css';

const base = style({
  borderRadius: vars.border.r1,
  border: vars.dynamic.inputBorder,
  background: vars.color.n25
});

export const inputGroup = style([
  base,
  {
    paddingInline: vars.size.s2,
    ':focus-within': {
      border: vars.border.active
    },
    selectors: {
      '&:has(:disabled)': disabled
    }
  }
]);

export const searchIcon = style({
  fontSize: 16
});

export const input = style([
  base,
  {
    fontSize: 12,
    lineHeight: '12px',
    color: vars.color.body,
    textAlign: 'start',
    padding: vars.padding.input,
    width: `calc(100% - 2 * ${vars.padding.input} - 2px)`,
    ':disabled': disabled,
    ':focus': {
      outline: 'none',
      border: vars.border.active
    },
    '::file-selector-button': {
      background: 'transparent',
      border: 'none',
      fontWeight: 500
    },
    selectors: {
      [`${inputGroup} > &`]: {
        border: 'none',
        paddingInline: 0
      },
      [`${editCell} &`]: {
        padding: 0
      }
    }
  }
]);
