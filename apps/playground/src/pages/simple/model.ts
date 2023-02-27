import { array, object, string } from 'yup';
import { atom } from '../../shared/factory';
import { createForm } from '../../shared/form';

const $$simple = atom(() => {
  const $$form = createForm({
    initialValues: {
      email: '',

      interests: []
    },

    schema: object({
      email: string()
        .required()

        .nullable()

        .email()

        .label('Email'),

      interests: array().of(string().required()).required()
    })
  });

  return {
    $$form
  };
});

export { $$simple };
