import { FormModel, FieldErrors } from '@filledout/core';
import {
  attach,
  combine,
  createEffect,
  createStore,
  is,
  sample,
  Store
} from 'effector';
import { reset } from 'patronum/reset';
import { AnySchema } from 'yup';
import { ValidationError } from 'yup';
import {
  ValidateValuesParams,
  ApplyYupValidateParams,
  ApplyYupValidationResult
} from './types';

const yupErrorToMapError = (err: ValidationError) => {
  const result: Record<any, any> = {};

  if (err.inner.length == 0) {
    result[err.path!] = [{ name: err.message, params: err.params }];

    return result;
  }

  err.inner.forEach(error => {
    if (!result[error.path!]) {
      result[error.path!] = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { originalValue, value, path, ...params } = error.params! as any;

    result[error.path!].push({ name: error.message, params });
  });

  return result;
};

const validateBySchema = async ({ values, schema }: ValidateValuesParams) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (error) {
    if (ValidationError.isError(error)) {
      throw yupErrorToMapError(error);
    }
  }
};

const applyYupValidationFlow = (
  { submit, rejected, validate, submitted, $values, $errors }: FormModel<any>,
  { schema }: ApplyYupValidateParams
): ApplyYupValidationResult => {
  const $schema = is.store(schema)
    ? (schema as Store<AnySchema>)
    : createStore(schema as AnySchema);

  const baseValidateFx = createEffect<any, void, Record<string, FieldErrors>>(
    validateBySchema
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

    source: {
      values: $values,

      schema: $schema
    },

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

  sample({
    clock: [$values.updates, validate],

    source: {
      schema: $schema,

      values: $values
    },

    target: validateOnChangeFx
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
