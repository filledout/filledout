import deepmerge from 'deepmerge';

import type { Event } from 'effector';

import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  sample
} from 'effector';

import { createGate } from 'effector-react';

import { set } from 'object-path-immutable';

import type { AnySchema } from 'yup';

import { ValidationError } from 'yup';

import { createFields } from './create-fields';

import type {
  CreateFormOptions,
  DeepPartial,
  FieldRefs,
  FormModel
} from './types';

import { ValidateOnEventType } from './types';

import { ValidationVisibilityCondition } from './types';

import type { MappedErrors } from './yup';

import { yupToFormErrors } from './yup';

import flat from 'flat';

const validate = async <V>({
  values,
  schema
}: {
  values: V;
  schema: AnySchema;
}) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (error) {
    if (ValidationError.isError(error)) {
      throw flat(yupToFormErrors(error));
    }
  }
};

const createForm = <V>({
  $initialValues,
  reinitialize,
  ...options
}: CreateFormOptions<V>): FormModel<V> => {
  const validateOn = options.validateOn ?? [
    ValidateOnEventType.Change,
    ValidateOnEventType.Blur
  ];

  const showValidationWhen = options.showValidationWhen ?? [
    ValidationVisibilityCondition.Touched,
    ValidationVisibilityCondition.Submitted
  ];

  const change = createEvent<[string, any]>();

  const submit = createEvent();

  const submitted = createEvent<V>();

  const rejected = createEvent<{
    values: V;
    errors: Record<string, string[]>;
  }>();

  const $schema = options.$schema ?? createStore<AnySchema>(null!);

  const patch = createEvent<DeepPartial<V>>();

  const put = createEvent<V>();

  const reset = createEvent<V | void>();

  const blured = createEvent<[string]>();

  const focused = createEvent<[string]>();

  const baseValidateFx = createEffect<
    { values: V; schema: AnySchema },
    void,
    Record<string, string[]>
  >(async ({ values, schema }) => {
    if (!schema) return;

    await validate({ values, schema });
  });

  const validateFx = attach({ effect: baseValidateFx });

  const validateBeforeSubmitFx = attach({ effect: baseValidateFx });

  const $submitCount = createStore(0);

  const $submitted = $submitCount.map(state => state > 0);

  const $disabled = options.$disabled ?? createStore(false);

  // const $validating = options.$validating ?? createStore(false);

  const $values = createStore<V>($initialValues.getState());

  const $externalErrors =
    options.$errors ?? createStore<Record<string, string[]>>({});

  const $validationErrors = createStore<Record<string, string>>({});

  const $errors = combine(
    $externalErrors,

    $validationErrors,

    (externalErrors, validationErrors): MappedErrors<V> =>
      deepmerge(externalErrors, validationErrors, {
        arrayMerge: (_, sourceArray) => sourceArray
      })
  );

  const $dirty = createStore<Record<string, boolean>>({});

  const $touched = createStore<Record<string, boolean>>({});

  const $focusedField = createStore<string>(null!);

  const $refs = createStore<Record<string, FieldRefs>>({});

  const refsGate = createGate<FieldRefs & { path: string }>();

  const $valid = $errors.map(state => Object.keys(state).length == 0);

  // @ts-expect-error deepmerge types are weird
  const patchData = sample({
    clock: patch,

    source: $values,

    fn: (values, payload) =>
      deepmerge(values as any, payload as any, {
        arrayMerge: (_, sourceArray) => sourceArray
      })
  });

  sample({
    source: $initialValues,

    filter: () => Boolean(reinitialize),

    target: reset
  });

  sample({
    clock: [
      sample({
        source: $schema
      }),

      validateOn.includes(ValidateOnEventType.Blur) && blured,

      validateOn.includes(ValidateOnEventType.Focus) && focused,

      validateOn.includes(ValidateOnEventType.Change) && change
    ].filter(Boolean) as any as Event<any>[],

    source: {
      values: $values,

      schema: $schema
    },

    fn: ({ values, schema }) => ({
      values,

      schema
    }),

    target: validateFx
  });

  sample({
    clock: submit,

    source: {
      values: $values,

      schema: $schema
    },

    target: validateBeforeSubmitFx
  });

  sample({
    clock: validateBeforeSubmitFx.doneData,

    source: $values,

    target: submitted
  });

  sample({
    clock: validateBeforeSubmitFx.failData,

    source: {
      values: $values
    },

    fn: ({ values }, errors) => ({
      values,

      errors
    }),

    target: rejected
  });

  $values
    .on(change, (state, [key, value]) => set(state, key, value))

    .on([put, patchData], (_, payload) => payload)

    .on(
      sample({
        clock: reset,

        source: $initialValues,

        fn: (initialValues, values) => values ?? initialValues
      }),

      (_, payload) => payload
    );

  $focusedField
    .on(focused, (_, [path]) => path)

    .reset(blured);

  $dirty
    .on(change, (state, [key]) => {
      if (state[key]) return state;

      return {
        ...state,
        [key]: true
      };
    })

    .reset(reset);

  $submitCount.on(submit, state => state + 1).reset(reset);

  $touched
    .on(blured, (state, [path]) => {
      if (state[path]) return state;

      return {
        ...state,
        [path]: true
      };
    })

    .reset(reset);

  $refs.on([refsGate.open, refsGate.state], (state, { path, ...refs }) => ({
    ...state,

    [path]: refs
  }));

  $validationErrors
    .on(baseValidateFx.failData, (_, payload) => payload ?? {})

    .reset(reset, baseValidateFx.doneData);

  const meta = {
    $refs,

    $dirty,

    $errors,

    $values,

    $schema,

    $touched,

    $disabled,

    $submitted,

    $focusedField,

    change,

    focused,

    blured,

    refsGate,

    validateOn,

    showValidationWhen
  };

  return {
    $refs,
    $valid,
    $values,
    $errors,
    $disabled,
    $submitted,
    $submitCount,
    $initialValues,
    $focused: $focusedField.map(Boolean),
    $dirty: $dirty.map(state => Object.keys(state).length > 0),
    $touched: $touched.map(state => Object.keys(state).length > 0),
    $touchedFields: $touched,

    put,
    patch,
    reset,
    submit,
    blured,
    focused,
    rejected,
    submitted,
    changed: change,

    fields: createFields<V>(meta as any)
  };
};

// $initialValues + reset
// $errors -> map
// $touched and others naming
// field change -> set
// useField more generic selectors

// array methods: add, remove, reoder, replace
// object method patch

export { createForm };
