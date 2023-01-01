import { FieldKey } from './config';
import { createFormFactory } from './create-form';
import { FormModel } from './types/common';
import { CreateFormFactoryParams } from './types/create-form';
import {
  ValidateOnEventType,
  ValidationVisibilityCondition
} from './types/enums';

type CreateLibParams<P, T> = {
  factoryInterceptor: (payload: FormModel<any>, params: P) => T;
} & Pick<CreateFormFactoryParams<P, T>, 'showValidationOn' | 'validateOn'>;

const createLib = <Params, Result>({
  factoryInterceptor,
  showValidationOn,
  validateOn
}: CreateLibParams<Params, Result>) => {
  const createForm = createFormFactory<Params, Result>({
    factoryInterceptor,

    validateOn: validateOn ?? [
      ValidateOnEventType.Change,
      ValidateOnEventType.Blur
    ],

    showValidationOn: showValidationOn ?? [
      ValidationVisibilityCondition.Touched,
      ValidationVisibilityCondition.Submitted
    ]
  });

  return {
    createForm
  };
};

export { createLib, FieldKey };

export type { FormModel, FormMeta, FormUnits } from './types/common';
