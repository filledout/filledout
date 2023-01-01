import { createLib } from '@filledout/core';
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

export { createForm };
