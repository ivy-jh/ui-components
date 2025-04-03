import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';
import config from '@axonivy/eslint-config';

export default tseslint.config(
  ...config.base,
  // TypeScript configs
  {
    name: 'typescript-eslint',
    languageOptions: {
      parserOptions: {
        project: true, // Uses tsconfig.json from current directory
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  // Storybook configs
  ...storybook.configs['flat/recommended'],
  // Project-specific overrides and custom rules
  {
    name: 'ignored-files',
    ignores: ['**/dev-packages/**', '**/.storybook/**']
  }
);
