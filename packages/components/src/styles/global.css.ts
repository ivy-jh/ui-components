import { globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('html, body', {
  height: '100%'
});

globalStyle('body', {
  margin: 0,
  fontFamily:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  fontSize: '12px'
});

globalStyle('code', {
  fontFamily: "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
});

globalStyle('.dark', {
  colorScheme: 'dark',
  background: vars.color.background,
  color: vars.color.body
});

globalStyle('.light', {
  colorScheme: 'light',
  background: vars.color.background,
  color: vars.color.body
});
