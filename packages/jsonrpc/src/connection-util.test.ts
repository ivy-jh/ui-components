import { urlBuilder } from './connection-util';

test('buildUrl', async () => {
  expect(urlBuilder('', '')).toEqual('/');
  expect(urlBuilder('hi', 'you')).toEqual('hi/you');
  expect(urlBuilder('hi/', '/you')).toEqual('hi/you');
  expect(urlBuilder(new URL('https://hi'), '/you')).toEqual('https://hi/you');
  expect(urlBuilder(new URL('ws://hi//bla'), '/you')).toEqual('ws://hi/bla/you');
});
