import { object, string } from 'yup';
import { atom } from '../../shared/factory';
import { createForm } from '../../shared/form';

const $$simple = atom(() => {
  const $$form = createForm({
    initialValues: {
      email: ''
    },

    schema: object({
      email: string()
        .required()

        .nullable()

        .email()

        .label('Email')
    })
  });

  $$form.submitted.watch(values => {
    console.log('Submitted', values);
  });

  $$form.rejected.watch(({ values, errors }) => {
    console.log('Rejected', values, errors);
  });

  return {
    $$form
  };
});

export { $$simple };
