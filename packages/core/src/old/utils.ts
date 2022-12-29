import type { AnySchema } from 'yup';

import { isSchema } from 'yup';

import { FieldKey } from './config';

import type { DeepSchema, FieldMeta, FieldModel, FormMeta } from './types';

const splitSchemaByPaths = (
  schema: DeepSchema<any>,
  result: Record<string, AnySchema> = {},
  path = ''
) => {
  Object.keys(schema).forEach(key => {
    const maybeSchema = schema[key];

    const next = path ? `${path}.${key}` : key;

    if (isSchema(maybeSchema)) {
      result[next] = maybeSchema;

      return;
    }

    splitSchemaByPaths(maybeSchema as DeepSchema<any>, result, next);
  });

  return result;
};

const getFieldMeta = (field: FieldModel<any>) => {
  // @ts-expect-error hidden field
  const meta: FieldMeta = field[FieldKey.meta];

  return meta;
};

const getFieldFormMeta = <V = any>(field: FieldModel<V>): FormMeta => {
  // @ts-expect-error hidden field
  const meta: FormMeta = field[FieldKey.formMeta];

  return meta;
};
export { splitSchemaByPaths, getFieldFormMeta, getFieldMeta };
