import { vanillaExtractPlugin as veVitePlugin } from '@vanilla-extract/vite-plugin';
import { defineProject } from 'vitest/config';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineProject({
  plugins: [veVitePlugin(), react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    name: 'components',
    include: ['src/**/*.test.ts?(x)'],
    alias: {
      'test-utils': resolve(__dirname, 'src/test-utils/test-utils.tsx')
    },
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['src/test-utils/setupTests.tsx'],
    css: false
  }
});
