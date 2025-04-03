import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const resizableGroup = style({});

export const resizableLine = style({
  width: 1,
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: vars.color.n200,
  selectors: {
    '&[data-panel-group-direction="vertical"]': {
      width: '100%',
      height: 1
    },
    '&[data-resize-handle-state=hover]': {
      backgroundColor: vars.color.p300
    },
    '&[data-resize-handle-active]': {
      backgroundColor: vars.color.p300
    }
  }
});

export const resizableHandle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: vars.color.n200,
  borderWidth: '1px',
  borderRadius: '3px',
  width: '.75rem',
  height: '1rem',
  zIndex: 10,
  selectors: {
    [`${resizableLine}[data-panel-group-direction="vertical"] &`]: {
      transform: 'rotate(90deg)'
    }
  }
});
