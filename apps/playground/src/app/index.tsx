import { Route } from 'atomic-router-react';
import { Home } from '../pages/home';
import { Simple } from '../pages/simple';
import { routes } from '../shared/router';

const App = () => {
  return (
    <div>
      <Route route={routes.home} view={Home} />

      <Route route={routes.simple} view={Simple} />
    </div>
  );
};

export { App };

export { $$router } from './router';
