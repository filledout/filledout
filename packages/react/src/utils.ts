const get = <T extends object, R = any>(
  source: T,
  path: string | string[]
): R | undefined => {
  const split = Array.isArray(path) ? path : path.split('.');

  // Base case: if there are no more properties to navigate, return the source object.
  if (split.length === 0) {
    return source as unknown as R;
  }

  const name = split[0];
  const value = source ? source[name as keyof T] : undefined;

  // If the value is an object and there are more properties to navigate, recurse.
  // Otherwise, return the value.
  return typeof value === 'object' && split.length > 1
    ? get(value as unknown as T, split.slice(1))
    : (value as R);
};

export { get };
