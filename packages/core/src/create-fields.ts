import { sample } from 'effector';

import { get } from 'object-path';

import { FieldKey } from './config';

import type { Fields, FormMeta } from './types';

const createFields = <V>(units: FormMeta<V>) => {
  const cache: Record<string, object> = {};

  const createProxy = (name: string) => {
    const cached = cache[name];

    if (!cached) {
      return new Proxy(
        {},
        {
          get: (_, key: string): unknown => {
            const cached = cache[name + '.' + key];

            if (cached) return cached;

            return createProxy(name + '.' + key);
          }
        }
      );
    }

    return cached;
  };

  return new Proxy(
    {},
    {
      get: (_, key: string) => {
        return createProxy(key);
      }
    }
  ) as Fields<V>;
};

export { createFields };
