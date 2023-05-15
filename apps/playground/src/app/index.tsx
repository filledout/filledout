import { Route } from 'atomic-router-react';
import { Home } from '../pages/home';
import { Simple } from '../pages/simple';
import { routes } from '../shared/router';

export const Application = () => {
  return (
    <div>
      <Route route={routes.home} view={Home} />
      <Route route={routes.simple} view={Simple} />
    </div>
  );
};

export { $$router } from './router';
