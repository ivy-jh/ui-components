import { create } from '@storybook/theming';
import logoUrl from './logo.svg';

export default create({
  base: 'dark',
  brandTitle: 'Axon Ivy',
  brandUrl: 'https://dev.axonivy.com',
  brandImage: logoUrl,
  brandTarget: '_self'
});
