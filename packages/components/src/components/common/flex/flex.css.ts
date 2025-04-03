import { vars } from '@/styles/theme.css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const flex = recipe({
  base: {
    display: 'flex'
  },

  variants: {
    direction: {
      column: { flexDirection: 'column' },
      row: { flexDirection: 'row' },
      'row-reverse': { flexDirection: 'row-reverse' }
    },
    gap: {
      1: { gap: vars.size.s1 },
      2: { gap: vars.size.s2 },
      3: { gap: vars.size.s3 },
      4: { gap: vars.size.s4 }
    },
    alignItems: {
      center: { alignItems: 'center' }
    },
    justifyContent: {
      center: { justifyContent: 'center' },
      'space-between': { justifyContent: 'space-between' },
      'flex-end': { justifyContent: 'flex-end' }
    }
  }
});

export type FlexVariants = RecipeVariants<typeof flex>;
