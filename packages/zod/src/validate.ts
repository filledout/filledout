import { FieldErrors, FormModel } from '@filledout/core';
import {
  attach,
  combine,
  createEffect,
  createStore,
  Event,
  is,
  sample,
  Store,
  StoreValue
} from 'effector';
import { reset } from 'patronum/reset';
import { AnyZodObject, ZodError, ZodIssue, ZodType, z } from 'zod';
import { ApplyZodParams, ValidateValuesParams } from './types';

const zodErrorsToErrorMap = (error: ZodError) => {
  return error.issues.reduce(
    (errors, issue) => {
      const {
        code,
        validation,
        path: pathArray,
        ...params
      } = issue as ZodIssue & { validation?: string };

      const path = pathArray.join('.');

      if (!errors[path]) {
        errors[path] = [];
      }

      errors[path].push({
        name: validation ? `${code}_${validation}` : code,
        params
      });

      return errors;
    },

    {} as Record<string, FieldErrors>
  );
};

const validateBySchema = async ({ values, schema }: ValidateValuesParams) => {
  try {
    const _schema = schema as AnyZodObject;

    _schema.passthrough
      ? _schema.passthrough().parse(values)
      : _schema.parse(values);
  } catch (error) {
    if (error instanceof ZodError) {
      throw zodErrorsToErrorMap(error);
    }

    throw error;
  }
};

const applyZod = <V>($$form: FormModel<V>, { schema }: ApplyZodParams) => {
  const $schema = is.store(schema)
    ? (schema as Store<ZodType<V>>)
    : createStore(schema as ZodType<V>);

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
    $validating,
    submitted: $$form.submitted as Event<z.output<StoreValue<typeof $schema>>>
  };
};

export { applyZod };
