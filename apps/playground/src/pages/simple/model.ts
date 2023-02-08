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

  return {
    $$form
  };
});

export { $$simple };
