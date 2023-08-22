import { array, object, string, z } from 'zod';
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
      email: string().email(),

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
    }).superRefine(data => {
      console.log(data, 'sr');
    })
  });

  $$form.rejected.watch(console.log);

  return {
    $$form
  };
});

export { $$simple };
