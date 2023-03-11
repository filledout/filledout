import { Store } from 'effector';
import { get } from 'object-path-immutable';
import { typedPath, DefaultHandlers } from 'typed-path';
import { FormModel } from './types/common';

type PathSelector<V, T> = (values: V) => T;

// selector(typedPath() as V).$path as string)

class Selectors<V> {
  public constructor(private $$form: FormModel<V>) {}

  private select<T>(selector: PathSelector<V, T>) {
    return (selector(typedPath() as V) as DefaultHandlers)
      .$path as any as string;
  }

  public value<T>(selector: PathSelector<V, T>) {
    const path = this.select(selector);

    return this.$$form.$values.map(
      state => get(state, path) ?? null
    ) as Store<T>;
  }

  public isDirty<T>(selector: PathSelector<V, T>) {
    const path = this.select(selector);

    return this.$$form.$dirty.map(state => state[path] ?? false);
  }

  public isTouched<T>(selector: PathSelector<V, T>) {
    const path = this.select(selector);

    return this.$$form.$touched.map(state => state[path] ?? false);
  }

  public isFocused<T>(selector: PathSelector<V, T>) {
    const path = this.select(selector);

    return this.$$form.$focused.map(state => state === path);
  }

  public path<T>(selector: PathSelector<V, T>) {
    const path = this.select(selector);

    return path;
  }

  public errors<T>(selector: PathSelector<V, T>) {
    const path = this.select(selector);

    return this.$$form.$errors.map(state => state[path] ?? {});
  }

  public set<T>(selector: PathSelector<V, T>) {
    const name = this.select(selector);

    return this.$$form.set.prepend((value: T) => ({
      name,
      value
    }));
  }
}

export { Selectors };

// set: Event<V>;
// change: Event<V>;
// changed: Event<V>;
// blured: Event<void>;
// focused: Event<void>;
