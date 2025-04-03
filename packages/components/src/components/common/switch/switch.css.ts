import { disabled } from '@/styles/disabled';
import { vars } from '@/styles/theme.css';
import { transitionColors } from '@/styles/transition.css';
import { createVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

const size = createVar();

export const switchSize = recipe({
  base: {
    vars: {
      [size]: '32px'
    }
  },
  variants: {
    size: {
      small: { vars: { [size]: '24px' } },
      large: { vars: { [size]: '42px' } }
    }
  }
});

export type SwitchVariants = RecipeVariants<typeof switchSize>;

export const root = style([
  transitionColors,
  {
    width: size,
    height: `calc(${size} * 0.5 + 4px)`,
    backgroundColor: vars.color.n100,
    borderRadius: 9999,
    position: 'relative',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    border: 'none',
    outline: 'none',
    padding: 0,
    flexShrink: 0,
    cursor: 'pointer',
    ':focus-visible': {
      boxShadow: vars.shadow.focus
    },
    ':disabled': disabled,
    selectors: {
      '&[data-state="checked"]': {
        backgroundColor: vars.color.p75
      }
    }
  }
]);

export const thumb = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: `calc(${size} * 0.5)`,
  aspectRatio: '1 / 1',
  backgroundColor: vars.color.background,
  color: vars.color.body,
  borderRadius: 9999,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  selectors: {
    '&[data-state="checked"]': {
      backgroundColor: vars.color.p300,
      transform: `translateX(calc(${size} - (${size} * 0.5) - 2px))`,
      color: vars.color.background
    }
  }
});

export const thumbIcon = recipe({
  base: {
    fontSize: '12px'
  },
  variants: {
    size: {
      small: {
        fontSize: '9px'
      },
      large: {
        fontSize: '16px'
      }
    }
  }
});
