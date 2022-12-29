import type { Event, Store } from 'effector';

import type { Gate } from 'effector-react';

import type { MutableRefObject } from 'react';

import type { AnySchema } from 'yup';

import type { MappedErrors } from './yup';

enum ValidateOnEventType {
  Blur = 0,

  Change = 1,

  Focus = 2
}

enum ValidationVisibilityCondition {
  Submitted = 0,

  Touched = 1,

  Dirty = 2
}

type ValueOf<T> = T[keyof T];

type DeepSchema<V> = {
  [P in keyof V]?: AnySchema | DeepSchema<V[P]>;
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type CreateFormOptions<V> = {
  $initialValues: Store<V>;

  reinitialize?: boolean;

  $disabled?: Store<boolean>;

  $validating?: Store<boolean>;

  $schema?: Store<any>;

  $errors?: Store<MappedErrors<V>>;

  validateOn?: ValidateOnEventType[];

  showValidationWhen?: ValidationVisibilityCondition[];
};

type FieldRefs = {
  focusable?: MutableRefObject<HTMLElement>;

  container?: MutableRefObject<HTMLElement>;
};

type ValidateParams<V> = {
  path: string;

  value: V;

  schemas: AnySchema[];
};

type FormModel<V> = {
  $refs: Store<Record<string, FieldRefs>>;

  $dirty: Store<boolean>;

  $valid: Store<boolean>;

  $disabled: Store<boolean>;

  $values: Store<V>;

  $errors: Store<Record<string, string[]>>;

  $touched: Store<boolean>;

  $touchedFields: Store<Record<string, boolean>>;

  $focused: Store<boolean>;

  $submitted: Store<boolean>;

  $submitCount: Store<number>;

  put: Event<V>;

  patch: Event<DeepPartial<V>>;

  reset: Event<V | void>;

  submit: Event<void>;

  changed: Event<[string, any]>;

  blured: Event<[string]>;

  focused: Event<[string]>;

  rejected: Event<{ values: V; errors: Record<string, string[]> }>;

  submitted: Event<V>;

  $initialValues: Store<V>;

  fields: Fields<V>;
};

type FieldModel<V> = {
  $value: Store<V>;
  $focused: Store<boolean>;
  $errors: Store<string[]>;
  $dirty: Store<boolean>;
  $touched: Store<boolean>;

  changed: Event<V>;
  path: string;
  change: Event<V>;
  blured: Event<void>;
  focused: Event<void>;

  // also hidden field __formMeta__
  // also hidden field __meta__
};

type FieldMeta = {
  path: string;
};

type FormMeta = Pick<
  CreateFormOptions<any>,
  'validateOn' | 'showValidationWhen'
> & {
  $refs: Store<Record<string, FieldRefs>>;

  $submitted: Store<boolean>;

  $values: Store<Record<string, any>>;

  $dirty: Store<Record<string, boolean>>;

  $touched: Store<Record<string, boolean>>;

  $errors: Store<MappedErrors<any>>;

  $disabled: Store<boolean>;

  $focusedField: Store<string>;

  refsGate: Gate<
    FieldRefs & {
      path: string;
    }
  >;

  change: Event<[string, any]>;

  focused: Event<[string]>;

  blured: Event<[string]>;
};

type Fields<V> = {
  [P in keyof V]: V[P] extends object
    ? FieldModel<V[P]> & Fields<V[P]>
    : V[P] extends any[]
    ? FieldModel<V[P]> & {
        [x: number]: FieldModel<V[P][number]>;
      }
    : FieldModel<V[P]>;
};

export type {
  ValueOf,
  Fields,
  DeepPartial,
  DeepSchema,
  CreateFormOptions,
  FormModel,
  FieldModel,
  ValidateParams,
  FieldMeta,
  FieldRefs,
  FormMeta
};

export { ValidateOnEventType, ValidationVisibilityCondition };
