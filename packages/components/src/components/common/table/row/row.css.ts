import { vars } from '@/styles/theme.css';
import { createVar, globalStyle, style } from '@vanilla-extract/css';

export const selectedRowBg = createVar();
export const selectedRowText = createVar();
export const selectedRowPlaceholderText = createVar();

export const selectedRow = style({
  vars: {
    [selectedRowBg]: 'transparent',
    [selectedRowText]: vars.color.body,
    [selectedRowPlaceholderText]: vars.color.n500
  },
  backgroundColor: selectedRowBg,
  color: selectedRowText,
  ':hover': {
    vars: {
      [selectedRowBg]: vars.color.p50
    }
  },
  selectors: {
    '&[data-state="selected"]': {
      vars: {
        [selectedRowBg]: vars.color.p300,
        [selectedRowText]: vars.color.background,
        [selectedRowPlaceholderText]: vars.color.n300
      }
    }
  }
});

export const dndRow = style({
  selectors: {
    '&[data-drop-target-state=true]': {
      borderTop: vars.border.active,
      borderTopWidth: 2
    },
    '&[data-drag-state=true] ~ &[data-drop-target-state=true]': {
      borderTop: vars.border.basic,
      borderBottom: vars.border.active,
      borderBottomWidth: 2
    }
  }
});

export const reorderHandle = style({});

globalStyle(`${reorderHandle} > :first-child`, {
  width: '100%'
});

export const reorderHandleIcon = style({
  cursor: 'grab',
  height: 15,
  flex: '0 0 15px',
  selectors: {
    [`${reorderHandle} &`]: {
      fontSize: 15
    }
  }
});
