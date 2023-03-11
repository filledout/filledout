const get = <T extends object, R = any>(
  source: T,
  path: string | string[]
): R => {
  const split = Array.isArray(path) ? path : path.split('.');

  const name = split[0];

  const value = source ? source[name as keyof T] : undefined;

  if (typeof value === 'object' && split.length > 1) {
    return get(value as any, split.slice(1));
  }

  return value as R;
};

export { get };
