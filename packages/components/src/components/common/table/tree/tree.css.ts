import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const expandCell = style({
  whiteSpace: 'nowrap'
});

export const expandButton = style({
  transform: 'rotate(90deg)',
  selectors: {
    '&[data-state=collapsed]': {
      transform: 'rotate(0deg)'
    }
  }
});

export const indent = style({
  height: '100%',
  marginInline: '10px 4px',
  borderLeft: `1px solid ${vars.color.n400}`
});

export const cellIcon = style({
  fontSize: '16px'
});
