import { ThemeProvider, useTheme } from './useTheme';
import { act, renderHook } from '@testing-library/react';

afterEach(() => {
  window.document.documentElement.classList.remove('light', 'dark');
  localStorage.clear();
});

test('no context', async () => {
  const { result } = renderHook(useTheme);
  expect(result.current.theme).toEqual('system');
  expect(result.current.disabled).toEqual(false);
  expect(window.document.documentElement.className).toHaveLength(0);
});

test('dark theme', async () => {
  const { result } = renderHook(useTheme, { wrapper: props => <ThemeProvider {...props} defaultTheme='dark' /> });
  expect(result.current.theme).toEqual('dark');
  expect(result.current.disabled).toEqual(false);
  expect(window.document.documentElement.className).includes('dark');
});

test('light theme', async () => {
  const { result } = renderHook(useTheme, { wrapper: props => <ThemeProvider {...props} defaultTheme='light' /> });
  expect(result.current.theme).toEqual('light');
  expect(result.current.disabled).toEqual(false);
  expect(window.document.documentElement.className).includes('light');
});

test('system theme', async () => {
  const { result } = renderHook(useTheme, { wrapper: props => <ThemeProvider {...props} defaultTheme='system' /> });
  expect(result.current.theme).toEqual('system');
  expect(result.current.disabled).toEqual(false);
  expect(window.document.documentElement.className).includes('light');
});

test('body element', async () => {
  const root = window.document.body;
  const { result } = renderHook(useTheme, { wrapper: props => <ThemeProvider {...props} root={root} /> });
  expect(result.current.theme).toEqual('system');
  expect(window.document.documentElement.className).toHaveLength(0);
  expect(root.className).includes('light');
});

test('no storage', async () => {
  const { result } = renderHook(useTheme, { wrapper: props => <ThemeProvider {...props} /> });
  expect(localStorage.length).to.equal(0);
  act(() => result.current.setTheme('dark'));
  expect(localStorage.length).to.equal(0);
});

test('storage', async () => {
  const { result } = renderHook(useTheme, { wrapper: props => <ThemeProvider {...props} storageKey='test' /> });
  expect(localStorage.length).to.equal(0);
  act(() => result.current.setTheme('dark'));
  expect(localStorage.length).to.equal(1);
  expect(localStorage.getItem('test')).to.equal('dark');
});

test('existing storage', async () => {
  localStorage.setItem('test', 'dark');
  const { result } = renderHook(useTheme, { wrapper: props => <ThemeProvider {...props} storageKey='test' /> });
  expect(result.current.theme).toEqual('dark');
  expect(window.document.documentElement.className).includes('dark');
});

test('disabled', async () => {
  const { result } = renderHook(useTheme, { wrapper: props => <ThemeProvider {...props} disabled /> });
  expect(result.current.theme).toEqual('system');
  expect(result.current.disabled).toEqual(true);
});
