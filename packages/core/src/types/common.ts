import { EventCallable, Store } from 'effector';
import { ValidationVisibilityCondition } from './enums';
import { DeepPartial, PathPayload, PathValuePair } from './utils';

type RejectionPayload<V> = { values: V; errors: ErrorsMap };

type ValidationTriggersConfiguration = {
  showValidationOn?: ValidationVisibilityCondition[];
};

type DeepMapTo<Values, T> = {
  [K in keyof Values]?: Values[K] extends any[]
    ? Values[K][number] extends object
      ? DeepMapTo<Values[K][number], T>[] | T | T[]
      : T | T[]
    : Values[K] extends object
    ? DeepMapTo<Values[K], T>
    : T;
};

type FieldErrors = {
  name: string;
  params: Record<string, any>;
}[];

type BaseFieldModel<V> = {
  $value: Store<V>;
  $isDirty: Store<boolean>;
  $isFocused: Store<boolean>;
  $isTouched: Store<boolean>;
  $errors: Store<FieldErrors>;

  path: string;
  set: EventCallable<V>;
  change: EventCallable<V>;
  changed: EventCallable<V>;
  blured: EventCallable<void>;
  focused: EventCallable<void>;
};

type FieldUIEvent<V = any> = {
  name: string;
  path: string;
  payload: V;
};

type ErrorsMap = Record<string, FieldErrors>;

type FormUnits<V, O = V> = {
  // state
  $values: Store<V>;

  $focused: Store<string>;

  $initialValues: Store<V>;

  $meta: Store<Record<string, any>>;

  $errors: Store<ErrorsMap>;

  $isDisabled: Store<boolean>;

  $submitCount: Store<number>;

  $dirty: Store<Record<string, boolean>>;

  $touched: Store<Record<string, boolean>>;

  // events
  submitted: EventCallable<O>;

  blured: EventCallable<PathPayload>;

  focused: EventCallable<PathPayload>;

  changed: EventCallable<PathValuePair>;

  rejected: EventCallable<RejectionPayload<V>>;

  // methods
  put: EventCallable<V>;

  reset: EventCallable<void>;

  validate: EventCallable<void>;

  set: EventCallable<PathValuePair>;

  submit: EventCallable<void | any>;

  patch: EventCallable<DeepPartial<V>>;

  change: EventCallable<PathValuePair>;

  setMeta: EventCallable<PathValuePair>;

  clearMeta: EventCallable<PathValuePair>;
};

type FormModel<V, O = V> = FormUnits<V, O> &
  ValidationTriggersConfiguration & {
    $isValid: Store<boolean>;

    $isDirty: Store<boolean>;

    $isFocused: Store<boolean>;

    $isTouched: Store<boolean>;

    $isSubmitted: Store<boolean>;
  };

export {
  FormUnits,
  FormModel,
  ErrorsMap,
  DeepMapTo,
  FieldErrors,
  FieldUIEvent,
  BaseFieldModel,
  RejectionPayload,
  ValidationTriggersConfiguration
};
