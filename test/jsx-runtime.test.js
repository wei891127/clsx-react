import { describe, expect, it } from 'vitest';
import { jsx, jsxs } from '../src/jsx-runtime.js';

describe('jsx-runtime', () => {
  it('handles string className', () => {
    const element = jsx('div', { className: 'foo bar' });
    expect(element.props.className).toBe('foo bar');
  });

  it('handles array className', () => {
    const element = jsx('div', { className: ['foo', 'bar', null, undefined] });
    expect(element.props.className).toBe('foo bar');
  });

  it('handles object className', () => {
    const element = jsx('div', { className: { foo: true, bar: false, baz: true } });
    expect(element.props.className).toBe('foo baz');
  });

  it('handles mixed className', () => {
    const element = jsx('div', { className: ['foo', { bar: true, baz: false }, 'qux'] });
    expect(element.props.className).toBe('foo bar qux');
  });

  it('handles nested arrays', () => {
    const element = jsx('div', { className: [['foo', 'bar'], ['baz', null], 'qux'] });
    expect(element.props.className).toBe('foo bar baz qux');
  });

  it('handles deeply nested arrays', () => {
    const element = jsx('div', { className: [['foo', ['bar', 'baz']], 'qux'] });
    expect(element.props.className).toBe('foo bar baz qux');
  });

  it('handles arrays with objects', () => {
    const element = jsx('div', { className: ['foo', { bar: true, baz: false }, ['qux', { quux: true }]] });
    expect(element.props.className).toBe('foo bar qux quux');
  });

  it('handles empty arrays and objects', () => {
    const element = jsx('div', { className: [[], {}, 'foo'] });
    expect(element.props.className).toBe('foo');
  });

  it('handles falsy values in arrays', () => {
    const element = jsx('div', { className: ['foo', false, '', 0, 'bar'] });
    expect(element.props.className).toBe('foo bar');
  });

  it('handles no className', () => {
    const element = jsx('div', { id: 'test' });
    expect(element.props.className).toBeUndefined();
  });

  it('handles jsxs the same way', () => {
    const element = jsxs('div', { className: ['foo', 'bar'] });
    expect(element.props.className).toBe('foo bar');
  });
});
