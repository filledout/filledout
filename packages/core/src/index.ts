import { createFormFactory } from './create-form';

const createLib = <Params>() => {
  const createForm = createFormFactory<Params>();

  return {
    createForm
  };
};

export { createLib };

export type { FormModel } from './types/common';
