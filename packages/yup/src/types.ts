import { Store } from 'effector';

type SchemaType = any;

type ApplyYupValidateParams = {
  schema?: SchemaType | Store<SchemaType>;
};

type ValidateValuesParams = {
  values: any;
  schema: SchemaType;
};

type ApplyYupValidationResult = {
  $schema: Store<SchemaType>;
  $validating: Store<boolean>;
};

export type {
  ApplyYupValidateParams,
  ValidateValuesParams,
  ApplyYupValidationResult
};
