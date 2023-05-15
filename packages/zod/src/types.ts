import { ZodType } from 'zod';

type ValidateValuesParams<V> = {
  values: any;
  schema: ZodType<V>;
};

type ApplyZodParams<V> = {
  schema: ZodType<V>;
};

export type { ValidateValuesParams, ApplyZodParams };
