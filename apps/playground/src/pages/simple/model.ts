import { array, object, string, z } from 'zod';
import { atom } from '../../shared/factory';
import { createForm } from '../../shared/form';

const $$simple = atom(() => {
  const schema = object({
    email: string()
      .email()

      .nullable(),

    interests: array(
      object({
        id: string(),

        name: string()
      })
    ).min(1),

    user: object({
      firstName: string().email(),

      role: object({
        name: string()
      })
    })
  });

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

    schema
  });

  $$form.rejected.watch(console.log);

  return {
    $$form
  };
});

export { $$simple };
