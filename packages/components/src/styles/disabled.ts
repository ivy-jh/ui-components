import type { CSSProperties } from '@vanilla-extract/css';
import { vars } from './theme.css';

export const disabled: CSSProperties = {
  backgroundColor: vars.color.n100,
  color: vars.color.n700,
  cursor: 'not-allowed'
};
