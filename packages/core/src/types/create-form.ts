import { Store } from 'effector';
import {
  DeepMapTo,
  ErrorsMap,
  FieldErrors,
  FormModel,
  ValidationTriggersConfiguration
} from './common';

type CreateFormParams<V> = {
  reinitialize?: boolean;

  isDisabled?: Store<boolean>;

  initialValues: Store<V> | V;

  errors?: Store<ErrorsMap> | Store<DeepMapTo<V, FieldErrors>>;
} & ValidationTriggersConfiguration;

type CreateFormFactoryParams<
  FactoryInterceptorParams,
  FactoryInterceptorResult
> = {
  factoryInterceptor: (
    payload: FormModel<any>,
    params: FactoryInterceptorParams
  ) => FactoryInterceptorResult;
} & ValidationTriggersConfiguration;

export type { CreateFormFactoryParams, CreateFormParams };
