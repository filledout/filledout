import { FormModel } from '@filledout/core';
import { useUnit } from 'effector-react';
import { useFields } from './fields';
import { FormFieldsSelector } from './types';

const useForm = <V>(
  $$form: FormModel<V>
): {
  fields: FormFieldsSelector<V>;
  isSubmitted: boolean;
  onSubmit: (payload: void) => void;
} => {
  const fields = useFields($$form);

  const { onSubmit, isSubmitted } = useUnit({
    onSubmit: $$form.submit,
    isSubmitted: $$form.$isSubmitted
  });

  return {
    fields,
    onSubmit,
    isSubmitted
  };
};

export { useForm };
