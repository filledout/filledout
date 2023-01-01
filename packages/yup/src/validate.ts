import { FormModel } from '@filledout/core';
import {
  attach,
  combine,
  createEffect,
  createStore,
  is,
  sample,
  Store
} from 'effector';
import { FieldErrors } from 'packages/core/src/types/common';
import { reset } from 'patronum/reset';
import { AnySchema } from 'yup';
import ValidationError from 'yup/lib/ValidationError';
import {
  ValidateValuesParams,
  ApplyYupValidateParams,
  ApplyYupValidationResult
} from './types';

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

const validate = async ({ values, schema }: ValidateValuesParams) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (error) {
    if (ValidationError.isError(error)) {
      throw yupErrorToMapError(error);
    }
  }
};

const applyYupValidationFlow = (
  { submit, rejected, submitted, $values, $errors }: FormModel<any>,
  { schema }: ApplyYupValidateParams
): ApplyYupValidationResult => {
  const $schema = is.store(schema)
    ? (schema as Store<AnySchema>)
    : createStore(schema as AnySchema);

  const baseValidateFx = createEffect<any, void, Record<string, FieldErrors>>(
    validate
  );

  const validateOnChangeFx = attach({
    effect: baseValidateFx
  });

  const validateBeforeSubmitFx = attach({
    effect: baseValidateFx
  });

  const $validating = combine(
    validateOnChangeFx.pending,
    validateBeforeSubmitFx.pending,

    (...args) => args.some(Boolean)
  );

  sample({
    clock: submit,

    source: $values,

    target: validateBeforeSubmitFx
  });

  sample({
    clock: baseValidateFx.failData,

    target: $errors
  });

  sample({
    clock: validateBeforeSubmitFx.doneData,

    source: $values,

    target: submitted
  });

  sample({
    clock: validateBeforeSubmitFx.failData,

    source: $values,

    fn: (values, errors) => ({
      values,
      errors
    }),

    target: rejected
  });

  reset({
    clock: baseValidateFx.done,

    target: [$errors]
  });

  return {
    $schema,
    $validating
  };
};

export { applyYupValidationFlow };
