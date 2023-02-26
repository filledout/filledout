import { FieldKey } from './config';
import { getFieldFormMeta } from './create-fields';
import { createFormFactory } from './create-form';
import { FormModel } from './types/common';
import { CreateFormFactoryParams } from './types/create-form';
import { ValidationVisibilityCondition } from './types/enums';

type CreateLibParams<P, T> = {
  factoryInterceptor: (payload: FormModel<any>, params: P) => T;
} & Pick<CreateFormFactoryParams<P, T>, 'showValidationOn'>;

const createLib = <Params, Result>({
  factoryInterceptor,
  showValidationOn
}: CreateLibParams<Params, Result>) => {
  const createForm = createFormFactory<Params, Result>({
    factoryInterceptor,

    showValidationOn: showValidationOn ?? [
      ValidationVisibilityCondition.Touched,
      ValidationVisibilityCondition.Submitted
    ]
  });

  return {
    createForm
  };
};

export { createLib, FieldKey, ValidationVisibilityCondition, getFieldFormMeta };

export type {
  Fields,
  FormMeta,
  FormModel,
  FormUnits,
  FieldModel,
  FieldErrors,
  BaseFieldModel,
  ListFieldModel
} from './types/common';
