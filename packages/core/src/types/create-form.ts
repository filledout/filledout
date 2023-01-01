import { Store } from 'effector';
import { DeepMapTo, FieldErrors, FormModel } from './common';
import { ValidateOnEventType, ValidationVisibilityCondition } from './enums';

type CreateFormParams<V> = {
  reinitialize?: boolean;

  isDisabled?: Store<boolean>;

  initialValues: Store<V> | V;

  validateOn?: ValidateOnEventType[];

  showValidationOn?: ValidationVisibilityCondition[];

  errors?:
    | Store<Record<string, FieldErrors>>
    | Store<DeepMapTo<V, FieldErrors>>;
};

type CreateFormFactoryParams<
  FactoryInterceptorParams,
  FactoryInterceptorResult
> = {
  factoryInterceptor: (
    payload: FormModel<any>,
    params: FactoryInterceptorParams
  ) => FactoryInterceptorResult;
};

export type { CreateFormFactoryParams, CreateFormParams };
