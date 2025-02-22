import { reactive } from './reactive.js';

describe('reactive', () => {
  it('wraps an object in a proxy and allows accessing raw values', () => {
    const result = reactive({ foo: 'foo', bar: 123 });

    expect(typeof result.foo).toBe('string');
    expect(result.foo).toBe('foo');
    expect(result.foo + 'bar').toBe('foobar');
    expect(typeof result.bar).toBe('number');
    expect(result.bar).toBe(123);
    expect(result.bar * 2).toBe(246);
    expect(JSON.stringify(result)).toBe('{"foo":"foo","bar":123}');

    expect(Object.entries(result)).toEqual([
      ['foo', 'foo'],
      ['bar', 123],
    ]);
  });
});
