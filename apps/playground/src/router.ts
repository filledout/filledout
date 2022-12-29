import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const router = createHistoryRouter({
  routes: []
});

export { router, history };
