import { createLib, ValidationVisibilityCondition } from '@filledout/core';
import { createLib as createReactLib } from '@filledout/react';
import {
  applyYupValidationFlow,
  ApplyYupValidateParams,
  ApplyYupValidationResult
} from '@filledout/yup';

const { createForm } = createLib<
  ApplyYupValidateParams,
  ApplyYupValidationResult
>({
  factoryInterceptor: (model, params) => {
    return applyYupValidationFlow(model, params);
  },

  showValidationOn: [
    ValidationVisibilityCondition.Submitted,
    ValidationVisibilityCondition.Touched,
    ValidationVisibilityCondition.Dirty
  ]
});

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
} = createReactLib();

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
