import { get } from './utils';

describe('get', () => {
  const obj = {
    a: {
      b: {
        c: 1
      }
    },
    d: [1, 2, 3],
    e: 'hello'
  };

  it('should return the value of a nested property using dot notation', () => {
    expect(get(obj, 'a.b.c')).toBe(1);
  });

  it('should return the value of a nested property using an array of keys', () => {
    expect(get(obj, ['a', 'b', 'c'])).toBe(1);
  });

  it('should return undefined for a non-existent property', () => {
    expect(get(obj, 'a.b.d')).toBeUndefined();
  });

  it('should return undefined for a null or undefined object', () => {
    expect(get(null!, 'a.b.c')).toBeUndefined();
    expect(get(undefined!, 'a.b.c')).toBeUndefined();
  });

  it('should return the value of a non-nested property', () => {
    expect(get(obj, 'e')).toBe('hello');
  });

  it('should return the value from an array', () => {
    expect(get(obj, 'd.0')).toBe(1);
    expect(get(obj, 'd.1')).toBe(2);
    expect(get(obj, 'd.2')).toBe(3);
  });

  it('should return undefined for an out-of-bounds array index', () => {
    expect(get(obj, 'd.5')).toBeUndefined();
  });
});
