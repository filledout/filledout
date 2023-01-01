import { createRoute } from 'atomic-router';
import { array, object, string } from 'yup';
import { atom } from '../../shared/atom';
import { createForm } from '../../shared/form';

const $$simpleFormPage = atom(() => {
  const $$route = createRoute();

  const $$form = createForm({
    initialValues: {
      email: 'dsad',
      password: '',
      roles: [] as string[]
    },

    schema: object({
      email: string().required().email(),

      password: string().min(6).max(16),

      roles: array().of(string().required().min(1)).min(1)
    })
  });

  return {
    $$form,
    $$route
  };
});

export { $$simpleFormPage };
