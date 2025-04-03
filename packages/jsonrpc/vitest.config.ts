import { defineProject } from 'vitest/config';
import { resolve } from 'path';

export default defineProject({
  plugins: [],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  test: {
    name: 'jsonrpc',
    include: ['src/**/*.test.ts?(x)'],
    globals: true,
    css: false
  }
});
