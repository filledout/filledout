import { createLib } from '@filledout/core';
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
  factoryInterceptor: (form, params) => {
    const result = applyYupValidationFlow(form, params);

    return result;
  }
});

const { useField, useForm } = createReactLib();

export { createForm, useField, useForm };
