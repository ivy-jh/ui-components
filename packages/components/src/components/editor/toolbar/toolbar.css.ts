import { vars } from '@/styles/theme.css';
import { createContainer, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

const container = createContainer();

export const toolbar = style({
  position: 'relative',
  inset: 0,
  width: '100%',
  height: 48,
  flex: '0 0 48px',
  background: vars.color.background,
  borderBottom: vars.border.basic,
  containerName: container,
  containerType: 'inline-size',
  userSelect: 'none'
});

export const toolbarHeader = style({
  marginInline: vars.size.s3,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%'
});

export const toolbarTitle = style({
  fontWeight: 600,
  fontSize: '14px'
});

const createMaxWidthQuery = (maxWidth?: number) => ({
  '@container': {
    [`${container} (width <= ${maxWidth}px)`]: {
      display: 'none'
    }
  }
});

const createMinWidthQuery = (minWidth?: number) => ({
  '@container': {
    [`${container} (width > ${minWidth}px)`]: {
      display: 'none'
    }
  }
});

export const toolbarContainer = recipe({
  variants: {
    maxWidth: {
      450: createMaxWidthQuery(450),
      650: createMaxWidthQuery(650)
    },
    minWidth: {
      450: createMinWidthQuery(450),
      650: createMinWidthQuery(650)
    }
  }
});

export type ToolbarContainerVariants = RecipeVariants<typeof toolbarContainer>;
