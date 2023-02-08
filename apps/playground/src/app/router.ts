import { createHistoryRouter } from 'atomic-router';
import { routes } from '../shared/router';

const $$router = createHistoryRouter({
  routes: [
    {
      route: routes.home,

      path: '/'
    },

    {
      route: routes.simple,

      path: '/simple'
    }
  ]
});

export { $$router };
