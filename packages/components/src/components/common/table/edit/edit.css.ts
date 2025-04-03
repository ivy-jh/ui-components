import { style } from '@vanilla-extract/css';
import { selectedRowBg, selectedRowPlaceholderText, selectedRowText } from '../row/row.css';
import { transitionColors } from '@/styles/transition.css';
import { vars } from '@/styles/theme.css';
import { row } from '../table.css';

export const editCell = style([
  transitionColors,
  {
    selectors: {
      [`${row} &`]: {
        backgroundColor: selectedRowBg,
        color: selectedRowText,
        border: 'none',
        padding: vars.size.s2
      },
      [`${row} &:focus`]: {
        border: 'none'
      },
      [`${row} &:focus-within`]: {
        border: 'none'
      },
      [`${row} &::placeholder`]: {
        color: selectedRowPlaceholderText,
        fontStyle: 'italic'
      },
      [`${row} &[data-placeholder]`]: {
        color: selectedRowPlaceholderText,
        fontStyle: 'italic'
      },
      [`${row} &:disabled`]: {
        backgroundColor: 'transparent'
      },
      [`${row} &:has(:disabled)`]: {
        vars: {
          '--N100': 'transparent'
        }
      }
    }
  }
]);
