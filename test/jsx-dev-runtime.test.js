import { describe, expect, it } from 'vitest';
import { jsxDEV } from '../src/jsx-dev-runtime.js';

describe('jsx-dev-runtime', () => {
  it('handles string className', () => {
    const element = jsxDEV('div', { className: 'foo bar' }, 'key', false, 'source', null);
    expect(element.props.className).toBe('foo bar');
  });

  it('handles array className', () => {
    const element = jsxDEV('div', { className: ['foo', 'bar', null, undefined] }, 'key', false, 'source', null);
    expect(element.props.className).toBe('foo bar');
  });

  it('handles object className', () => {
    const element = jsxDEV('div', { className: { foo: true, bar: false, baz: true } }, 'key', false, 'source', null);
    expect(element.props.className).toBe('foo baz');
  });

  it('handles mixed className', () => {
    const element = jsxDEV(
      'div',
      { className: ['foo', { bar: true, baz: false }, 'qux'] },
      'key',
      false,
      'source',
      null,
    );
    expect(element.props.className).toBe('foo bar qux');
  });

  it('handles nested arrays', () => {
    const element = jsxDEV('div', { className: [['foo', 'bar'], ['baz', null], 'qux'] }, 'key', false, 'source', null);
    expect(element.props.className).toBe('foo bar baz qux');
  });

  it('handles deeply nested arrays', () => {
    const element = jsxDEV('div', { className: [['foo', ['bar', 'baz']], 'qux'] }, 'key', false, 'source', null);
    expect(element.props.className).toBe('foo bar baz qux');
  });

  it('handles arrays with objects', () => {
    const element = jsxDEV(
      'div',
      { className: ['foo', { bar: true, baz: false }, ['qux', { quux: true }]] },
      'key',
      false,
      'source',
      null,
    );
    expect(element.props.className).toBe('foo bar qux quux');
  });

  it('handles empty arrays and objects', () => {
    const element = jsxDEV('div', { className: [[], {}, 'foo'] }, 'key', false, 'source', null);
    expect(element.props.className).toBe('foo');
  });

  it('handles falsy values in arrays', () => {
    const element = jsxDEV('div', { className: ['foo', false, '', 0, 'bar'] }, 'key', false, 'source', null);
    expect(element.props.className).toBe('foo bar');
  });

  it('handles no className', () => {
    const element = jsxDEV('div', { id: 'test' }, 'key', false, 'source', null);
    expect(element.props.className).toBeUndefined();
  });
});
