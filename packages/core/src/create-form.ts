import { createEvent, createStore, is, Store } from 'effector';
import { createFields } from './create-fields';
import {
  FieldErrors,
  FormModel,
  NamePayload,
  NameValuePair,
  RejectionPayload
} from './types/common';
import { CreateFormParams } from './types/create-form';
import { DeepPartial } from './types/util';

const createFormFactory = <Params>() => {
  const createForm = <V>({
    initialValues,
    isDisabled,
    ...params
  }: CreateFormParams<V> & Params): FormModel<V, Params> => {
    // events
    const submitted = createEvent<V>();

    const blured = createEvent<NamePayload>();

    const focused = createEvent<NamePayload>();

    const changed = createEvent<NameValuePair>();

    const rejected = createEvent<RejectionPayload<V>>();

    // methods

    const put = createEvent<V>();

    const reset = createEvent<V | void>();

    const patch = createEvent<DeepPartial<V>>();

    const submit = createEvent<void | unknown>();

    const set = createEvent<NameValuePair>();

    const change = createEvent<NameValuePair>();

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

    const $errors = createStore<Record<string, FieldErrors>>({});

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

    const meta = {
      $dirty,
      $errors,
      $values,
      $focused,
      $isDirty,
      $touched,
      $submitCount,
      $initialValues,

      put,
      set,
      reset,
      patch,
      blured,
      change
    };

    const fields = createFields(meta);

    return {
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
      submitted,

      fields,
      params: params as Params
    };
  };

  return createForm;
};

export { createFormFactory };
