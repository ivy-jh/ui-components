import { globalStyle } from '@vanilla-extract/css';
import { vars } from '../src/styles/theme.css';

globalStyle('.dark .docs-story', {
  background: vars.color.background
});

globalStyle('#storybook-root', {
  height: '100%'
});
