import { FormModel } from '@filledout/core';
import { sample } from 'effector';
import ValidationError from 'yup/lib/ValidationError';
import { YupValidateParams } from './types';

const yupErrorToMapError = (err: ValidationError) => {
  const result: Record<any, any> = {};

  if (err.inner.length == 0) {
    if (!result[err.path!]) {
      result[err.path!] = {};
    }

    result[err.path!][err.message] = err.params;

    return result;
  }

  err.inner.forEach(error => {
    if (!result[error.path!]) {
      result[error.path!] = {};
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { originalValue, value, path, ...params } = error.params! as any;

    result[error.path!][error.message] = params;
  });

  return result;
};

const applyYupValidationFlow = ({
  submit,
  submitted,
  $errors
}: FormModel<any, YupValidateParams>) => {};

export { applyYupValidationFlow };
