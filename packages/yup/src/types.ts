import { Store } from 'effector';
import { AnySchema } from 'yup';

type ApplyYupValidateParams = {
  schema?: AnySchema | Store<AnySchema>;
};

type ValidateValuesParams = {
  values: any;
  schema: AnySchema;
};

type ApplyYupValidationResult = {
  $schema: AnySchema;
  $validating: Store<boolean>;
};

export type {
  ApplyYupValidateParams,
  ValidateValuesParams,
  ApplyYupValidationResult
};
