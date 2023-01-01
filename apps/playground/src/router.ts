import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';
import { $$simpleFormPage } from './pages/simple-form/model';

const history = createBrowserHistory();

const router = createHistoryRouter({
  routes: [
    {
      path: '/simple',
      route: $$simpleFormPage.$$route
    }
  ]
});

export { router, history };
