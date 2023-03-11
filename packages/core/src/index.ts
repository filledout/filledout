import { createFormFactory } from './create-form';
import { Selector } from './select';
import { FormModel } from './types/common';
import { CreateFormFactoryParams } from './types/create-form';
import { ValidationVisibilityCondition } from './types/enums';

type CreateLibParams<P, T> = {
  factoryInterceptor?: (payload: FormModel<any>, params: P) => T;
} & Pick<CreateFormFactoryParams<P, T>, 'showValidationOn'>;

const select = new Selector();

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

export { createLib, select, ValidationVisibilityCondition };

export type {
  FormMeta,
  FormModel,
  FormUnits,
  ErrorsMap,
  FieldErrors,
  FieldUIEvent,
  BaseFieldModel,
  RejectionPayload
} from './types/common';

export type { CreateFormParams } from './types/create-form';
