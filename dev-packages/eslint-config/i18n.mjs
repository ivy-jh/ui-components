import tseslint from 'typescript-eslint';
import i18next from 'eslint-plugin-i18next';

export const i18n = tseslint.config({
  name: 'eslint-plugin-i18next',
  ...i18next.configs['flat/recommended'],
  files: ['**/*.{ts,tsx}'],
  ignores: ['**/*.{test,spec}.{ts,tsx}'],
  rules: {
    'i18next/no-literal-string': [
      'warn',
      {
        mode: 'jsx-only',
        'jsx-attributes': { include: ['label', 'aria-label', 'title', 'name'] }
      }
    ]
  }
});
