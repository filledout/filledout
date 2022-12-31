import { createRoute } from 'atomic-router';
import { atom } from '../../shared/atom';
import { createForm } from '../../shared/form';

const $$simpleFormPage = atom(() => {
  const $$route = createRoute();

  const $$form = createForm({
    initialValues: {
      email: '',
      password: '',
      roles: [] as string[]
    }
  });

  return {
    $$form,
    $$route
  };
});

export { $$simpleFormPage };
