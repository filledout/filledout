import { createEvent, sample, Store, StoreValue } from 'effector';
import { get } from 'object-path-immutable';
import { typedPath, DefaultHandlers } from 'typed-path';
import { FormModel } from './types/common';
import { nope } from './utils';

type PathSelector<V, T> = (values: V) => T;

type FormValue<F extends FormModel<any>> = StoreValue<F['$values']>;

class Selector {
  private getPath<T, F extends FormModel<any>>(
    selector: PathSelector<FormValue<F>, T>
  ) {
    return (selector(typedPath() as FormValue<F>) as DefaultHandlers)
      .$path as any as string;
  }

  public value<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return $$form.$values.map(state => get(state, path) ?? null) as Store<T>;
  }

  public isDirty<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return $$form.$dirty.map(state => state[path] ?? false);
  }

  public isTouched<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return $$form.$touched.map(state => state[path] ?? false);
  }

  public isFocused<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return $$form.$focused.map(state => state === path);
  }

  public path<T, F extends FormModel<any>>(
    _: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return path;
  }

  public errors<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return $$form.$errors.map(state => state[path] ?? {});
  }

  public set<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return $$form.set.prepend((value: T) => ({
      path,
      value
    }));
  }

  public change<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return $$form.change.prepend((value: T) => ({
      path,
      value
    }));
  }

  public changed<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return sample({
      clock: $$form.changed,

      filter: ({ path: changedName }) => changedName == path,

      fn: ({ value }) => value as T
    });
  }

  public blured<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return sample({
      clock: $$form.blured,

      filter: ({ path: bluredPath }) => bluredPath === path,

      fn: nope
    });
  }

  public focused<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    return sample({
      clock: $$form.focused,

      filter: ({ path: focusedPath }) => focusedPath === path,

      fn: nope
    });
  }

  public insert<T extends any[], F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

    const insert = createEvent<{
      at: 'start' | 'end' | number;

      value: T[number];
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

  public remove<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const path = this.getPath(selector);

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

  public field<T, F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const $$field = {
      set: this.set<T, F>($$form, selector),
      path: this.path<T, F>($$form, selector),
      blured: this.blured<T, F>($$form, selector),
      change: this.change<T, F>($$form, selector),
      changed: this.changed<T, F>($$form, selector),
      focused: this.focused<T, F>($$form, selector),

      $value: this.value<T, F>($$form, selector),
      $errors: this.errors<T, F>($$form, selector),
      $isDirty: this.isDirty<T, F>($$form, selector),
      $isFocused: this.isFocused<T, F>($$form, selector),
      $isTouched: this.isTouched<T, F>($$form, selector)
    };

    return $$field;
  }

  public listField<T extends any[], F extends FormModel<any>>(
    $$form: F,
    selector: PathSelector<FormValue<F>, T>
  ) {
    const $$field = this.field($$form, selector);

    return {
      ...$$field,
      insert: this.insert<T, F>($$form, selector),
      remove: this.remove<T, F>($$form, selector)
    };
  }
}

export { Selector };
