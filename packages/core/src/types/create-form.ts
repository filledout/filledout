import { Effect, Event, Store } from 'effector';
import {
  ErrorsMap,
  FormModel,
  ValidationTriggersConfiguration
} from './common';

type CreateFormParams<V> = {
  reinitialize?: boolean;

  isDisabled?: Store<boolean>;

  initialValues: Store<V> | V;

  onSubmit?: Effect<V, any>;

  onReject?: Effect<{ values: V; errors: ErrorsMap }, any>;

  resetOn?: (Event<any> | Effect<any, any>)[];

  validateOn?: (Event<any> | Effect<any, any>)[];

  errors?: Store<ErrorsMap>;
} & ValidationTriggersConfiguration;

type CreateFormFactoryParams<
  FactoryInterceptorParams,
  FactoryInterceptorResult
> = {
  factoryInterceptor?: (
    payload: FormModel<any>,
    params: FactoryInterceptorParams
  ) => FactoryInterceptorResult;
} & ValidationTriggersConfiguration;

export type { CreateFormFactoryParams, CreateFormParams };
