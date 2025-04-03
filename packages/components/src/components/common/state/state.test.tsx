import { evalDotState } from './state';

test('evalDotState messages', async () => {
  expect(evalDotState([], 'configured')).toEqual('configured');
  expect(evalDotState([{ variant: 'description' }], 'configured')).toEqual('configured');
  expect(evalDotState([{ variant: 'info' }], 'configured')).toEqual('configured');
  expect(evalDotState([{ variant: 'warning' }], 'configured')).toEqual('warning');
  expect(evalDotState([{ variant: 'error' }], 'configured')).toEqual('error');
  expect(evalDotState([{ variant: 'error' }, { variant: 'warning' }], 'configured')).toEqual('error');
  expect(evalDotState([{ variant: 'warning' }, { variant: 'error' }], 'configured')).toEqual('error');
});
