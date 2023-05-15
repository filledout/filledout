import { Link } from 'atomic-router-react';
import { routes } from '../../shared/router';

export const Home = () => {
  return (
    <div>
      <Link to={routes.simple}>Simple form</Link>
    </div>
  );
};
