import { vars } from '@/styles/theme.css';
import { style } from '@vanilla-extract/css';

const sharedConditionStyles = {
  border: vars.border.basic,
  borderRadius: vars.border.r2,
  padding: vars.size.s2
};

export const conditionBorder = style(sharedConditionStyles);

export const conditionGroupBorder = style({
  selectors: {
    '&[data-condition-mode="nested-condition"]': sharedConditionStyles
  }
});

export const operatorField = style({
  width: 150
});

export const logicalOperatorField = style({
  width: 70
});
