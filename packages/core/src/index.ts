import { createFormFactory } from './create-form';
import { Selector } from './select';
import { CreateFormFactoryParams } from './types/create-form';
import { ValidationVisibilityCondition } from './types/enums';

type CreateLibParams = Pick<CreateFormFactoryParams, 'showValidationOn'>;

const select = new Selector();

const createLib = ({ showValidationOn }: CreateLibParams) => {
  const createForm = createFormFactory({
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
  FormModel,
  FormUnits,
  ErrorsMap,
  FieldErrors,
  FieldUIEvent,
  BaseFieldModel,
  RejectionPayload
} from './types/common';

export type { CreateFormParams } from './types/create-form';
