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

type FieldErrors = { name: string; params: Record<string, any> }[];

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

type FormUnits<V> = {
  // state
  $values: Store<V>;

  $focused: Store<string>;

  $initialValues: Store<V>;

  $isDisabled: Store<boolean>;

  $submitCount: Store<number>;

  $dirty: Store<Record<string, boolean>>;

  $touched: Store<Record<string, boolean>>;

  $errors: Store<ErrorsMap>;

  $externalErrors: Store<ErrorsMap>;

  // events
  submitted: Event<V>;

  blured: Event<PathPayload>;

  focused: Event<PathPayload>;

  changed: Event<PathValuePair>;

  rejected: Event<RejectionPayload<V>>;

  // methods
  put: Event<V>;

  reset: Event<void>;

  set: Event<PathValuePair>;

  patch: Event<DeepPartial<V>>;

  submit: Event<void | any>;

  change: Event<PathValuePair>;

  validate: Event<void>;

  dispatch: Event<FieldUIEvent>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type FormModel<V, P = {}> = FormUnits<V> &
  ValidationTriggersConfiguration & {
    $isValid: Store<boolean>;

    $isDirty: Store<boolean>;

    $isFocused: Store<boolean>;

    $isTouched: Store<boolean>;

    $isSubmitted: Store<boolean>;
  } & P;

type FormMeta<V> = FormUnits<V> & ValidationTriggersConfiguration;

export {
  FormMeta,
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
