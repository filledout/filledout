import { sample } from 'effector';

import { get } from 'object-path';

import { FieldKey } from './config';

import type { Fields, FormMeta } from './types';

const createFields = <V>(units: FormMeta) => {
  const created: Record<FieldKey, Record<string, any>> = {
    [FieldKey.$dirty]: {},

    [FieldKey.$errors]: {},

    [FieldKey.$focused]: {},

    [FieldKey.$touched]: {},

    [FieldKey.$value]: {},

    [FieldKey.blured]: {},

    [FieldKey.focused]: {},

    [FieldKey.changed]: {},

    [FieldKey.path]: {},

    [FieldKey.change]: {}
  } as Record<FieldKey, Record<string, any>>;

  const createProxy = (path: string): any =>
    new Proxy(
      {},

      {
        get: (_, key: string) => {
          switch (key) {
            case FieldKey.$dirty: {
              const $dirty = created[FieldKey.$dirty][path];

              if (!$dirty) {
                return (created[FieldKey.$dirty] = units.$dirty.map(
                  state => state[path]
                ));
              }

              return $dirty;
            }

            case FieldKey.$errors: {
              const $errors = created[FieldKey.$errors][path];

              if (!$errors) {
                return (created[FieldKey.$errors][path] = units.$errors.map(
                  errors => get(errors, path)
                ));
              }

              return $errors;
            }

            case FieldKey.$focused: {
              const $focused = created[FieldKey.$focused][path];

              if (!$focused) {
                return (created[FieldKey.$focused][path] =
                  units.$focusedField.map(state => state == path));
              }

              return $focused;
            }

            case FieldKey.$touched: {
              const $touched = created[FieldKey.$touched][path];

              if (!$touched) {
                return (created[FieldKey.$touched] = units.$touched.map(
                  state => state[path]
                ));
              }

              return $touched;
            }

            case FieldKey.$value: {
              const $value = created[FieldKey.$value][path];

              if (!$value) {
                return (created[FieldKey.$value][path] = units.$values.map(
                  state => get(state, path)
                ));
              }

              return $value;
            }

            case FieldKey.formMeta: {
              return units;
            }

            case FieldKey.meta: {
              return {
                path
              };
            }

            case FieldKey.blured: {
              const blured = created[FieldKey.blured][path];

              if (!blured) {
                return sample({
                  clock: units.blured,

                  filter: ([_path]) => _path === path
                });
              }

              return blured;
            }

            case FieldKey.focused: {
              const focused = created[FieldKey.focused];

              if (!focused) {
                return sample({
                  clock: units.focused,

                  filter: ([_path]) => _path === path
                });
              }

              return focused;
            }

            case FieldKey.path: {
              return path;
            }

            case FieldKey.changed: {
              const changed = created[FieldKey.changed][path];

              if (!changed) {
                return (created[FieldKey.changed][path] = sample({
                  clock: units.change,

                  filter: ([_path]) => _path === path
                }));
              }

              return changed;
            }

            case FieldKey.change: {
              const change = created[FieldKey.changed][path];

              if (!change) {
                return (created[FieldKey.changed][path] = units.change.prepend(
                  (value: any) => [path, value]
                ));
              }

              return change;
            }

            default:
              return createProxy(`${path}.${key}`);
          }
        }
      }
    );

  return new Proxy(
    {},

    {
      get: (_, key: string) => createProxy(key)
    }
  ) as Fields<V>;
};

export { createFields };
