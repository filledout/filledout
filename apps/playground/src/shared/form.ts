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
  factoryInterceptor: form => {
    form;

    applyYupValidationFlow;
  }
});

export { createForm };
