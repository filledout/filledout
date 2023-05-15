import { FormModel } from '@filledout/core';
import { useEffect, useMemo, useRef } from 'react';
import { FormFieldsSelector } from './types';

const useFields = <V>($$form: FormModel<V>): FormFieldsSelector<V> => {
  // Create a cache for memoization.
  const cacheRef = useRef<Record<string, unknown>>({});

  useEffect(() => {
    // Clear the cache on unmount.
    return () => {
      cacheRef.current = {};
    };
  }, []);

  return useMemo(() => {
    const createProxy = (parentPath: string) => {
      return new Proxy(
        {},
        {
          get: (_, key: string): any => {
            const path = `${parentPath}.${key}`;

            // Use cache if possible.
            if (cacheRef.current[path]) return cacheRef.current[path];

            // If key is special, return related value directly.
            if (key === '_path') return parentPath;
            if (key === '_form') return $$form;

            // Otherwise, create a new proxy for the nested path and cache it.
            const proxy = createProxy(path);
            cacheRef.current[path] = proxy;

            return proxy;
          }
        }
      );
    };

    return createProxy('');
  }, [$$form]) as FormFieldsSelector<V>;
};

export { useFields };
