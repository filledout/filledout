/* eslint-disable effector/no-ambiguity-target */
/* eslint-disable effector/enforce-store-naming-convention */
import { createEvent, sample } from 'effector';

import { get } from 'object-path';

import { FieldKey } from './config';

import type { BaseFieldModel, Fields, FormMeta } from './types/common';
import { nope } from './utils';

const getFieldFormMeta = <V = any>(field: BaseFieldModel<any>) => {
  return (field as any)[FieldKey.units] as FormMeta<V>;
};

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
                return (cache[path] = units.$errors.map(
                  state => state[path] ?? {}
                ));
              }

              case FieldKey.$isDirty: {
                return (cache[path] = units.$dirty.map(
                  state => state[path] ?? false
                ));
              }

              case FieldKey.$isFocused: {
                return (cache[path] = units.$focused.map(
                  state => state == path
                ));
              }

              case FieldKey.$isTouched: {
                return (cache[path] = units.$touched.map(
                  state => state[path] ?? false
                ));
              }

              case FieldKey.$value: {
                return (cache[path] = units.$values.map(
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

                  filter: ({ name: changedName }) => changedName == path,

                  fn: ({ value }) => value
                }));
              }

              case FieldKey.focused: {
                return (cache[path] = sample({
                  clock: units.focused,

                  filter: ({ name: focusedName }) => focusedName == name,

                  fn: nope
                }));
              }

              case FieldKey.path: {
                return name;
              }

              case FieldKey.set: {
                return (cache[path] = units.set.prepend((value: any) => ({
                  name,
                  value
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
                    const value: any[] = [...get(values as object, name)];

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
                      name,
                      value
                    };
                  },

                  target: units.change
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
                    const result: any[] = [...get(values as object, name)];

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
                      name,
                      value: result
                    };
                  },

                  target: units.change
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

export { createFields, getFieldFormMeta };
