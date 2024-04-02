import { FieldErrors, FormModel } from '@filledout/core';
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
import { ValidationError } from 'yup';
import { ApplyYupParams, SchemaType, ValidateValuesParams } from './types';

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

const validateBySchema = async ({
  values,
  schema
}: ValidateValuesParams<any>) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (error) {
    if (ValidationError.isError(error)) {
      throw yupErrorToMapError(error);
    }
  }
};

const applyYup = <V>($$form: FormModel<V>, { schema }: ApplyYupParams<V>) => {
  const $schema = is.store(schema)
    ? (schema as Store<SchemaType<V>>)
    : createStore(schema as SchemaType<V>);

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
    clock: $$form.submit,

    source: {
      values: $$form.$values,

      schema: $schema
    },

    target: validateBeforeSubmitFx
  });

  sample({
    clock: baseValidateFx.failData,
    target: $$form.$errors
  });

  sample({
    clock: validateBeforeSubmitFx.doneData,

    source: $$form.$values,

    target: $$form.submitted
  });

  sample({
    clock: validateBeforeSubmitFx.failData,

    source: $$form.$values,

    fn: (values, errors) => ({
      values,
      errors
    }),

    target: $$form.rejected
  });

  sample({
    clock: [$$form.$values.updates, $$form.validate],

    source: {
      schema: $schema,

      values: $$form.$values
    },

    target: validateOnChangeFx
  });

  reset({
    clock: baseValidateFx.done,

    target: [$$form.$errors]
  });

  return {
    ...$$form,
    $schema,
    $validating
  };
};

export { applyYup };
