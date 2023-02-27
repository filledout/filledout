import {
  CreateFormParams,
  createLib,
  ValidationVisibilityCondition
} from '@filledout/core';
import { createLib as createReactLib } from '@filledout/react';
import { applyYup, ApplyYupParams } from '@filledout/yup';

const lib = createLib({
  showValidationOn: [
    ValidationVisibilityCondition.Submitted,
    ValidationVisibilityCondition.Touched,
    ValidationVisibilityCondition.Dirty
  ]
});

const createForm = <V>(params: CreateFormParams<V> & ApplyYupParams<V>) => {
  const $$form = lib.createForm<V>(params);

  return {
    ...$$form,

    ...applyYup($$form, params)
  };
};

const {
  useDirty,
  useErrors,
  useExternalErrors,
  useField,
  useFocused,
  useForm,
  useSubmitted,
  useTouched,
  useValue
} = createReactLib({ validateOnUseForm: true });

export {
  createForm,
  useDirty,
  useErrors,
  useExternalErrors,
  useField,
  useFocused,
  useForm,
  useSubmitted,
  useTouched,
  useValue
};
