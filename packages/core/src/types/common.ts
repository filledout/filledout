import { Event, Store } from 'effector';
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
  set: Event<V>;
  change: Event<V>;
  changed: Event<V>;
  blured: Event<void>;
  focused: Event<void>;
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
  submitted: Event<O>;

  blured: Event<PathPayload>;

  focused: Event<PathPayload>;

  changed: Event<PathValuePair>;

  rejected: Event<RejectionPayload<V>>;

  // methods
  put: Event<V>;

  reset: Event<void>;

  validate: Event<void>;

  set: Event<PathValuePair>;

  submit: Event<void | any>;

  patch: Event<DeepPartial<V>>;

  change: Event<PathValuePair>;

  setMeta: Event<PathValuePair>;

  clearMeta: Event<PathValuePair>;
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
