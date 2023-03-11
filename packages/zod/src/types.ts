import { ZodType } from 'zod';

type SchemaType<V> = ZodType<V>;

type ValidateValuesParams<V> = {
  values: any;
  schema: SchemaType<V>;
};

type ApplyZodParams<V> = {
  schema: SchemaType<V>;
};

export type { ValidateValuesParams, ApplyZodParams, SchemaType };
