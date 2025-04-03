import { vars } from '@/styles/theme.css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const message = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: vars.size.s1,
    margin: 0,
    paddingInline: vars.size.s1,
    fontSize: 12,
    fontWeight: 400
  },

  variants: {
    variant: {
      description: { color: vars.color.n700 },
      info: {},
      warning: { color: vars.color.warning },
      error: { color: vars.color.error }
    }
  }
});

export type MessageVariants = RecipeVariants<typeof message>;
