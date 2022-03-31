import { Navigate } from 'react-router-dom';

import { RoutePaths } from '@/presentation/constants/RoutePaths';
import { makeUserIsAuthenticated } from '../factories/useCases/userIsAuthenticated';

interface PrivateProps {
  element: JSX.Element;
  isPrivate?: boolean;
}

export const Route = ({
  element,
  isPrivate = false,
}: PrivateProps): JSX.Element => {
  const isAuthenticated = makeUserIsAuthenticated().execute();

  return isPrivate === isAuthenticated ? (
    element
  ) : (
    <Navigate
      replace
      to={isPrivate ? RoutePaths.SignIn : RoutePaths.Payments}
    />
  );
};
