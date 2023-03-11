import deepmerge from 'deepmerge';
import { createEvent, createStore, Event, is, sample, Store } from 'effector';
import { set as setProperty } from 'object-path-immutable';
import { reset as resetAll } from 'patronum/reset';
import { createFields } from './create-fields';
import {
  ErrorsMap,
  FieldUIEvent,
  FormModel,
  RejectionPayload
} from './types/common';
import { CreateFormFactoryParams, CreateFormParams } from './types/create-form';
import { DeepPartial, NamePayload, NameValuePair } from './types/utils';

const createFormFactory = <FactoryInterceptorParams, FactoryInterceptorResult>({
  factoryInterceptor,
  showValidationOn: showValidationOnDefaults
}: CreateFormFactoryParams<
  FactoryInterceptorParams,
  FactoryInterceptorResult
>) => {
  const createForm = <V>({
    errors,
    resetOn,
    onSubmit,
    onReject,
    isDisabled,
    validateOn,
    reinitialize,
    initialValues,
    showValidationOn = showValidationOnDefaults,
    ...params
  }: CreateFormParams<V> & FactoryInterceptorParams): FormModel<
    V,
    FactoryInterceptorResult
  > => {
    // events
    const submitted = createEvent<V>();

    const blured = createEvent<NamePayload>();

    const focused = createEvent<NamePayload>();

    const dispatch = createEvent<FieldUIEvent>();

    const changed = createEvent<NameValuePair>();

    const rejected = createEvent<RejectionPayload<V>>();

    // methods

    const put = createEvent<V>();

    const reset = createEvent<void>();

    const patch = createEvent<DeepPartial<V>>();

    const submit = createEvent<void | any>();

    const set = createEvent<NameValuePair>();

    const change = createEvent<NameValuePair>();

    const validate = createEvent<void>();

    const $initialValues = (
      is.store(initialValues) ? initialValues : createStore(initialValues)
    ) as Store<V>;

    // state
    // eslint-disable-next-line effector/no-getState
    const $values = createStore<V>($initialValues.getState());

    const $focused = createStore<string>(null!);

    const $isDisabled = isDisabled ?? createStore(false);

    const $submitCount = createStore(0);

    const $dirty = createStore<Record<string, boolean>>({});

    const $touched = createStore<Record<string, boolean>>({});

    const $externalErrors = errors ?? createStore<ErrorsMap>({});

    const $errors = createStore<ErrorsMap>({});

    // calculated

    const $isValid = $errors.map(state => {
      const values = Object.values(state);

      if (values.length == 0) return true;

      return values.every(one => Object.keys(one).length == 0);
    });

    const $isDirty = $dirty.map(state => Object.keys(state).length > 0);

    const $isTouched = $touched.map(state => Object.keys(state).length > 0);

    const $isFocused = $focused.map(Boolean);

    const $isSubmitted = $submitCount.map(count => count > 0);

    const $subscribers = createStore([]);

    // const subscribe = createEvent();

    // const unsubscribe = createEvent();

    const meta = {
      $dirty,
      $errors,
      $values,
      $focused,
      $isDirty,
      $touched,
      $isDisabled,
      $submitCount,
      $subscribers,
      $initialValues,
      $externalErrors,

      put,
      set,
      reset,
      patch,
      blured,
      change,
      submit,
      focused,
      changed,
      rejected,
      dispatch,
      validate,
      submitted,

      showValidationOn
    };

    const fields = createFields(meta);

    sample({
      clock: patch as Event<V>,

      source: $values,

      fn: (values, payload) =>
        deepmerge(values as any, payload as any, {
          arrayMerge: (_, sourceArray) => sourceArray
        }) as V,

      target: $values
    });

    if (reinitialize) {
      sample({
        clock: $initialValues.updates,

        target: [reset, put]
      });
    }

    sample({
      clock: reset,

      source: $initialValues,

      target: $values
    });

    sample({
      clock: put,

      target: $values
    });

    sample({
      clock: [change, set],

      source: $values,

      fn: (values, { name, value }) => {
        return setProperty(values, name, value);
      },

      target: $values
    });

    sample({
      clock: change,

      target: changed
    });

    sample({
      clock: focused,

      fn: ({ name }) => name,

      target: $focused
    });

    sample({
      clock: blured,

      fn: () => null as unknown as string,

      target: $focused
    });

    sample({
      clock: submit,

      source: $submitCount,

      fn: count => count + 1,

      target: $submitCount
    });

    sample({
      clock: change,

      source: $dirty,

      fn: (state, { name }) => ({
        ...state,
        [name]: true
      }),

      target: $dirty
    });

    sample({
      clock: blured,

      source: $touched,

      fn: (state, { name }) => ({
        ...state,
        [name]: true
      }),

      target: $touched
    });

    if (reinitialize) {
      sample({
        clock: $initialValues.updates,

        target: $values
      });
    }

    sample({
      clock: reset,

      source: $initialValues,

      target: $values
    });

    resetAll({
      clock: reset,

      target: [$dirty, $errors, $focused, $submitCount, $touched]
    });

    if (onSubmit) {
      sample({
        clock: submitted,

        target: onSubmit
      });
    }

    if (onReject) {
      sample({
        clock: rejected,

        target: onReject
      });
    }

    if (resetOn) {
      sample({
        clock: resetOn,

        target: reset
      });
    }

    if (validateOn) {
      sample({
        clock: validateOn,

        target: validate
      });
    }

    const form = {
      $dirty,
      $errors,
      $values,
      $focused,
      $isDirty,
      $isValid,
      $touched,
      $isFocused,
      $isTouched,
      $isDisabled,
      $isSubmitted,
      $submitCount,
      $initialValues,
      $externalErrors,

      put,
      set,
      reset,
      patch,
      blured,
      change,
      submit,
      changed,
      focused,
      rejected,
      validate,
      dispatch,
      submitted,

      fields,
      showValidationOn
    };

    return {
      ...form,

      ...(factoryInterceptor
        ? factoryInterceptor(form, params as FactoryInterceptorParams) ?? {}
        : {})
    } as FormModel<V, FactoryInterceptorResult>;
  };

  return createForm;
};

export { createFormFactory };
