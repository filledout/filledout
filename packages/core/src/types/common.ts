import { Event, Store } from 'effector';
import { ValidationVisibilityCondition } from './enums';
import { DeepPartial, NamePayload, NameValuePair } from './utils';

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

type Fields<V> = {
  [P in keyof V]: V[P] extends Array<any>
    ? ListFieldModel<V[P][number]>
    : V[P] extends object
    ? FieldModel<V[P]> & Fields<V[P]>
    : FieldModel<V[P]>;
};

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

type FieldModel<V> = BaseFieldModel<V>;

type ListFieldModel<V> = BaseFieldModel<V> & {
  remove: Event<'first' | 'last' | number>;

  add: Event<{ at: 'start' | 'end' | number; value: V }>;

  [x: number]: FieldModel<V> & Fields<V>;
};

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

  blured: Event<NamePayload>;

  focused: Event<NamePayload>;

  changed: Event<NameValuePair>;

  rejected: Event<RejectionPayload<V>>;

  // methods
  put: Event<V>;

  reset: Event<void>;

  set: Event<NameValuePair>;

  patch: Event<DeepPartial<V>>;

  submit: Event<void | any>;

  change: Event<NameValuePair>;

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
  Fields,
  FormMeta,
  FormUnits,
  FormModel,
  ErrorsMap,
  DeepMapTo,
  FieldModel,
  FieldErrors,
  FieldUIEvent,
  BaseFieldModel,
  ListFieldModel,
  RejectionPayload,
  ValidationTriggersConfiguration
};
