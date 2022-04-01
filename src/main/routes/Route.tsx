import { Navigate } from 'react-router-dom';

import { RoutePaths } from '@/presentation/constants/RoutePaths';
import { makeGetUserId } from '../factories/useCases/getUserId';
import { useStore } from '../../presentation/store/useStore';
import { useEffect } from 'react';

interface PrivateProps {
  element: JSX.Element;
  isPrivate?: boolean;
}

export const Route = ({
  element,
  isPrivate = false,
}: PrivateProps): JSX.Element => {
  const onSaveUserId = useStore(state => state.onSaveUserId);
  const userId = makeGetUserId().execute();

  useEffect(() => {
    if (!!userId) {
      onSaveUserId(userId);
    }
  }, [userId, onSaveUserId]);

  return isPrivate === !!userId ? (
    element
  ) : (
    <Navigate
      replace
      to={isPrivate ? RoutePaths.SignIn : RoutePaths.Payments}
    />
  );
};
