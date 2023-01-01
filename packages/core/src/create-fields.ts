/* eslint-disable effector/enforce-store-naming-convention */
import { nope } from '@filledout/utils';
import { sample } from 'effector';

import { get } from 'object-path';

import { FieldKey } from './config';

import type { Fields, FormMeta } from './types/common';

const createFields = <V>(units: FormMeta<V>) => {
  const cache: Record<string, any> = {};

  const createProxy = (name: string) => {
    const cached = cache[name];

    if (!cached) {
      return new Proxy(
        {},
        {
          get: (_, key: string): unknown => {
            const path = name + '.' + key;
            const cached = cache[path];

            if (cached) return cached;

            switch (key) {
              case FieldKey.$errors: {
                return (cached[path] = units.$errors.map(
                  state => state[path] ?? {}
                ));
              }

              case FieldKey.$isDirty: {
                return (cached[path] = units.$dirty.map(
                  state => state[path] ?? false
                ));
              }

              case FieldKey.$isFocused: {
                return (cached[path] = units.$focused.map(
                  state => state == path
                ));
              }

              case FieldKey.$isTouched: {
                return (cached[path] = units.$touched.map(
                  state => state[path] ?? false
                ));
              }

              case FieldKey.$value: {
                return (cached[path] = units.$values.map(
                  state => get(state as object, path) ?? null
                ));
              }

              case FieldKey.blured: {
                return (cache[path] = sample({
                  clock: units.blured,

                  filter: ({ name }) => name == path,

                  fn: nope
                }));
              }

              case FieldKey.change: {
                return (cache[path] = units.change.prepend((value: any) => ({
                  value,
                  name: path
                })));
              }

              case FieldKey.changed: {
                return (cache[path] = sample({
                  clock: units.changed,

                  filter: ({ name }) => name == path,

                  fn: ({ value }) => value
                }));
              }

              case FieldKey.focused: {
                return (cache[path] = sample({
                  clock: units.focused,

                  filter: ({ name }) => name == path,

                  fn: nope
                }));
              }

              case FieldKey.name: {
                return path;
              }

              case FieldKey.set: {
                return (cache[path] = units.set.prepend((value: any) => ({
                  value,
                  name: path
                })));
              }

              case FieldKey.units: {
                return units;
              }
            }

            return createProxy(path);
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
