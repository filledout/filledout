import { Store } from 'effector';
import { Schema } from 'yup';

type SchemaType<V> = Schema<V>;

type ValidateValuesParams<V> = {
  values: any;
  schema: SchemaType<V>;
};

type ApplyYupParams<V> = {
  schema?: SchemaType<V> | Store<SchemaType<V>>;
};

export type { ValidateValuesParams, ApplyYupParams, SchemaType };
