import { capitalize, labelText, splitByCamelCase, splitNewLine } from './string';

test('capitalize', () => {
  expect(capitalize('')).equals('');
  expect(capitalize('t')).equals('T');
  expect(capitalize('test')).equals('Test');
  expect(capitalize('Test')).equals('Test');
  expect(capitalize('a cool day')).equals('A cool day');
  expect(capitalize('aCoolDay')).equals('ACoolDay');
  expect(capitalize('MyVar')).equals('MyVar');
});

test('splitByCamelCase', () => {
  expect(splitByCamelCase('')).equals('');
  expect(splitByCamelCase('t')).equals('t');
  expect(splitByCamelCase('test')).equals('test');
  expect(splitByCamelCase('Test')).equals('Test');
  expect(splitByCamelCase('a cool day')).equals('a cool day');
  expect(splitByCamelCase('aCoolDay')).equals('a Cool Day');
  expect(splitByCamelCase('MyVar')).equals('My Var');
});

test('labelText', () => {
  expect(labelText('')).equals('');
  expect(labelText('t')).equals('T');
  expect(labelText('test')).equals('Test');
  expect(labelText('Test')).equals('Test');
  expect(labelText('a cool day')).equals('A cool day');
  expect(labelText('aCoolDay')).equals('A Cool Day');
  expect(labelText('MyVar')).equals('My Var');
});

test('splitNewLine', () => {
  expect(splitNewLine('')).toEqual(['']);
  expect(splitNewLine('abc')).toEqual(['abc']);
  expect(splitNewLine('abc\ndef')).toEqual(['abc', 'def']);
  expect(splitNewLine('abc\rdef')).toEqual(['abc', 'def']);
  expect(splitNewLine('abc\r\ndef')).toEqual(['abc', 'def']);
});
