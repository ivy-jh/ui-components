import type { Preview } from '@storybook/react';
import './preview.css';
import '../src/styles/global.css';
import '@axonivy/ui-icons/lib/ivy-icons.css';
import React from 'react';
import { ReadonlyProvider } from '../src/context/useReadonly';

const preview: Preview = {
  parameters: {
    controls: {
      exclude: ['asChild', 'className']
    },
    backgrounds: { disable: true }
  },

  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'light' },
          { value: 'dark', title: 'dark' }
        ],
        showName: true
      }
    },
    readonly: {
      defaultValue: false,
      toolbar: {
        icon: 'unlock',
        items: [
          { value: false, icon: 'unlock', title: 'Read & Write' },
          { value: true, icon: 'lock', title: 'Readonly' }
        ],
        showName: false
      }
    }
  },

  decorators: [
    (StoryFn, context) => {
      const theme = context.globals.theme;
      const color = context.parameters.backgrounds.values.find(t => t.name === theme).value;
      const body = document.body;
      body.classList.remove('dark', 'light');
      body.classList.add(theme);
      return (
        <ReadonlyProvider readonly={context.globals.readonly}>
          <StoryFn />
        </ReadonlyProvider>
      );
    }
  ],

  tags: ['autodocs']
};

export default preview;
