import { vars } from '@/styles/theme.css';
import { keyframes, style } from '@vanilla-extract/css';

const pulse = keyframes({
  '50%': { opacity: 0.5 }
});

export const skeleton = style({
  backgroundColor: vars.color.n100,
  borderRadius: vars.border.r2,
  animation: `${pulse} 2s cubic-bezier(.4,0,.6,1) infinite`
});
