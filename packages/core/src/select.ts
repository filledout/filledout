import { createEvent, sample, Store } from 'effector';
import { get } from 'object-path-immutable';
import { typedPath, DefaultHandlers } from 'typed-path';
import { FieldModel, FormModel, ListFieldModel } from './types/common';
import { nope } from './utils';

type PathSelector<V, T> = (values: V) => T;

class Selector {
  private getPath<T, V>(selector: PathSelector<V, T>) {
    return (selector(typedPath() as V) as DefaultHandlers)
      .$path as any as string;
  }

  public value<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return $$form.$values.map(state => get(state, path) ?? null) as Store<T>;
  }

  public isDirty<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return $$form.$dirty.map(state => state[path] ?? false);
  }

  public isTouched<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return $$form.$touched.map(state => state[path] ?? false);
  }

  public isFocused<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return $$form.$focused.map(state => state === path);
  }

  public path<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return path;
  }

  public errors<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return $$form.$errors.map(state => state[path] ?? {});
  }

  public set<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return $$form.set.prepend((value: T) => ({
      path,
      value
    }));
  }

  public change<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return $$form.change.prepend((value: T) => ({
      path,
      value
    }));
  }

  public changed<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return sample({
      clock: $$form.changed,

      filter: ({ path: changedName }) => changedName == path,

      fn: ({ value }) => value as T
    });
  }

  public blured<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return sample({
      clock: $$form.blured,

      filter: ({ path: bluredPath }) => bluredPath === path,

      fn: nope
    });
  }

  public focused<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    return sample({
      clock: $$form.focused,

      filter: ({ path: focusedPath }) => focusedPath === path,

      fn: nope
    });
  }

  public insert<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    const insert = createEvent<{
      at: 'start' | 'end' | number;

      value: V;
    }>();

    sample({
      clock: insert,

      source: $$form.$values,

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
          path,
          value: result
        };
      },

      target: $$form.change
    });

    return insert;
  }

  public remove<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T> | string
  ) {
    const path =
      typeof selector == 'string' ? selector : this.getPath(selector);

    const remove = createEvent<'first' | 'last' | number>();

    sample({
      clock: remove,

      source: $$form.$values,

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
          path,
          value
        };
      },

      target: $$form.change
    });

    return remove;
  }

  public field<T, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T>
  ): FieldModel<T> {
    const path = this.getPath(selector);

    const $$field: FieldModel<T> = {
      blured: this.blured<T, V>($$form, path),
      change: this.change<T, V>($$form, path),
      changed: this.changed<T, V>($$form, path),
      $errors: this.errors<T, V>($$form, path),
      focused: this.focused<T, V>($$form, path),
      path: this.path<T, V>($$form, path),
      set: this.set<T, V>($$form, path),
      $isDirty: this.isDirty<T, V>($$form, path),
      $isFocused: this.isFocused<T, V>($$form, path),
      $isTouched: this.isTouched<T, V>($$form, path),
      $value: this.value<T, V>($$form, path)
    };

    return $$field as any;
  }

  public listField<T extends Array<any>, V>(
    $$form: FormModel<V>,
    selector: PathSelector<V, T>
  ) {
    const $$field = this.field($$form, selector);

    return {
      ...$$field,
      insert: this.insert<T, V>($$form, $$field.path),
      remove: this.remove<T, V>($$form, $$field.path)
    };
  }
}

export { Selector };
