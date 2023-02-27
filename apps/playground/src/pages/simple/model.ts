import { array, object, string } from 'yup';
import { atom } from '../../shared/factory';
import { createForm } from '../../shared/form';

const $$simple = atom(() => {
  const $$form = createForm({
    initialValues: {
      email: '',

      user: {
        firstName: '',

        role: {
          name: ''
        }
      },

      interests: []
    },

    schema: object({
      email: string()
        .required()

        .nullable()

        .email()

        .label('Email'),

      interests: array()
        .of(
          object({
            id: string(),

            name: string()
          })
        )

        .required(),

      user: object({
        firstName: string(),

        role: object({
          name: string()
        })
      })
    })
  });

  return {
    $$form
  };
});

export { $$simple };
