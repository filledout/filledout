import {
  CreateFormParams,
  createLib,
  ValidationVisibilityCondition
} from '@filledout/core';
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

export { createForm };
