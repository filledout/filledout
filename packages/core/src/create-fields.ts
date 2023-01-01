/* eslint-disable effector/no-ambiguity-target */
/* eslint-disable effector/enforce-store-naming-convention */
import { nope } from '@filledout/utils';
import { createEvent, EventPayload, sample } from 'effector';

import { get } from 'object-path';

import { FieldKey } from './config';

import type { Fields, FormMeta, ListFieldModel } from './types/common';

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

              // array methods

              case FieldKey.remove: {
                const remove = (cache[path] = createEvent<
                  'first' | 'last' | number
                >());

                sample({
                  clock: remove,

                  source: units.$values,

                  fn: (values, payload) => {
                    const value: any[] = [...get(values as object, path)];

                    if (payload == 'first') {
                      value.shift();
                    }

                    if (payload == 'last') {
                      value.pop();
                    }

                    if (typeof payload == 'number') {
                      value.splice(payload, 1);
                    }

                    return {
                      value,
                      name: path
                    };
                  },

                  target: units.changed
                });

                return remove;
              }

              case FieldKey.add: {
                const add = (cache[path] = createEvent<{
                  at: 'start' | 'end' | number;

                  value: V;
                }>());

                sample({
                  clock: add,

                  source: units.$values,

                  fn: (values, { value, at }) => {
                    const result: any[] = [...get(values as object, path)];

                    if (at == 'start') {
                      result.unshift(value);
                    }

                    if (at == 'end') {
                      result.push(value);
                    }

                    if (typeof at == 'number') {
                      result.splice(at, 0, value);
                    }

                    return {
                      name: path,
                      value: result
                    };
                  },

                  target: units.changed
                });

                return add;
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
