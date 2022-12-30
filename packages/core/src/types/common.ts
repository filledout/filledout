import { Event, Store } from 'effector';
import { DeepPartial } from './util';

type NamePayload = {
  name: string;
};

type NameValuePair<V = unknown> = NamePayload & {
  value: V;
};

type RejectionPayload<V> = { values: V; errors: Record<string, FieldErrors> };

type FlattenObject<V> = {};

type FieldErrors = {};

type Fields<V> = {};

type BaseFieldModel<V> = {
  $value: Store<V>;
  $isDirty: Store<boolean>;
  $isFocused: Store<boolean>;
  $isTouched: Store<boolean>;
  $errors: Store<FieldErrors>;

  name: string;
  set: Event<V>;
  change: Event<V>;
  changed: Event<V>;
  blured: Event<void>;
  focused: Event<void>;
};

type FieldModel<V> = BaseFieldModel<V>;

type ListFieldModel<V> = BaseFieldModel<V> & {};

type FormUnits<V> = {
  // state
  $values: Store<V>;

  $focused: Store<string>;

  $initialValues: Store<V>;

  $isDisabled: Store<boolean>;

  $submitCount: Store<number>;

  $dirty: Store<Record<string, boolean>>;

  $touched: Store<Record<string, boolean>>;

  $errors: Store<Record<string, FieldErrors>>;

  // events
  submitted: Event<V>;

  blured: Event<NamePayload>;

  focused: Event<NamePayload>;

  changed: Event<NameValuePair>;

  rejected: Event<RejectionPayload<V>>;

  // methods
  put: Event<V>;

  reset: Event<V | void>;

  set: Event<NameValuePair>;

  patch: Event<DeepPartial<V>>;

  submit: Event<void | unknown>;

  change: Event<NameValuePair>;
};

type FormModel<V, P> = FormUnits<V> & {
  params: P;

  fields: Fields<V>;

  $isValid: Store<boolean>;

  $isDirty: Store<boolean>;

  $isFocused: Store<boolean>;

  $isTouched: Store<boolean>;

  $isSubmitted: Store<boolean>;
};

type FormMeta<V> = FormUnits<V>;

export {
  FormMeta,
  FormModel,
  FieldModel,
  NamePayload,
  FieldErrors,
  NameValuePair,
  RejectionPayload
};
