import { vars } from '@/styles/theme.css';
import { keyframes } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

const rotation = keyframes({
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
});

export const spinner = recipe({
  base: {
    width: 36,
    height: 36,
    border: `4px solid ${vars.color.n800}`,
    borderBottomColor: 'transparent',
    borderRadius: '50%',
    display: 'inline-block',
    boxSizing: 'border-box',
    animation: `${rotation} 1s linear infinite`
  },
  variants: {
    size: {
      small: {
        width: 12,
        height: 12,
        borderWidth: 2
      },
      medium: {
        width: 24,
        height: 24,
        borderWidth: 3
      },
      large: {}
    }
  }
});

export type SpinnerVariants = RecipeVariants<typeof spinner>;
