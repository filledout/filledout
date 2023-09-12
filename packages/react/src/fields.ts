import { FormModel } from '@filledout/core';
import { useEffect, useMemo, useRef } from 'react';
import { FormFieldsSelector } from './types';

const shouldCache = typeof window !== 'undefined';

const useFields = <V>(
  $$form: FormModel<V>
): FormFieldsSelector<Required<V>> => {
  const cacheRef = useRef<Record<string, any>>({});

  useEffect(
    () => () => {
      cacheRef.current = {};
    },

    []
  );

  return useMemo(() => {
    const spawn = (parent: string, name: string) => {
      const path = `${parent ? `${parent}.` : ''}${name}`;

      if (name == '_path') {
        return parent;
      }

      if (name == '_form') {
        return $$form;
      }

      if (cacheRef.current[path] && shouldCache) return cacheRef.current[path];

      return new Proxy(
        {},

        {
          get: (_, key: string): any => {
            return (cacheRef.current[`${path}.${key}`] = spawn(path, key));
          }
        }
      );
    };

    return new Proxy(
      {},

      {
        get: (_, key: string) => {
          if (cacheRef.current[key]) return cacheRef.current[key];

          const proxy = spawn('', key);

          if (shouldCache) {
            cacheRef.current[key] = proxy;
          }

          return proxy;
        }
      }
    );
  }, [$$form]) as FormFieldsSelector<Required<V>>;
};

export { useFields };
