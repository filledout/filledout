import { useForm } from '@filledout/react';
import { Field } from '../../shared/field';
import { $$simple } from './model';

const Simple = () => {
  const { fields, onSubmit } = useForm($$simple.$$form);

  return (
    <form
      onSubmit={event => {
        event?.preventDefault();

        onSubmit();
      }}
    >
      <Field.Input field={fields.email} />

      <button type='submit'>Submit</button>
    </form>
  );
};

export { Simple };
