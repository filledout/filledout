import { Store } from 'effector';
import { FormModel } from './common';

type CreateFormParams<V> = {
  isDisabled?: Store<boolean>;

  initialValues: Store<V> | V;
};

type CreateFormFactory<Params> = <V>(
  params: CreateFormParams<V> & Params
) => FormModel<V, Params>;

export { CreateFormFactory, CreateFormParams };
