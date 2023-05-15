import { createHistoryRouter } from 'atomic-router';
import { RoutesPath } from '../shared/enums/routes';
import { routes } from '../shared/router';

export const $$router = createHistoryRouter({
  routes: [
    {
      route: routes.home,
      path: RoutesPath.HOME
    },
    {
      route: routes.simple,
      path: RoutesPath.SIMPLE
    }
  ]
});
