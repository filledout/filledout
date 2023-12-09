import { array, object, string } from 'zod';
import { atom } from '../../shared/factory';
import { createForm } from '../../shared/form';

const $$simple = atom(() => {
  const $$form = createForm<{
    email: string;
    user: {
      firstName: string;
      role: {
        name: string;
      };
      interests: {
        id: string;
        name: string;
      }[];
    };
  }>({
    initialValues: {
      email: '',

      user: {
        firstName: '',

        role: {
          name: ''
        },

        interests: []
      }
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
    })
  });

  return {
    $$form
  };
});

export { $$simple };
