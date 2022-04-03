import { RefObject, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useOnclickOutside from 'react-cool-onclickoutside';

import { SignOut } from '@/useCases/SignOut';
import { RoutePaths } from '../../constants/RoutePaths';
import { useStore } from '../../store/useStore';
import { PopoverRef } from '../Popover';

type UseControllerHookProps = {
  signOut(): SignOut;
};

type UseControllerHook = (props: UseControllerHookProps) => {
  onSignOut(): void;
  popoverRef: RefObject<PopoverRef>;
  elementRef: any;
};

export const useController: UseControllerHook = ({ signOut }) => {
  const popoverRef = useRef<PopoverRef>(null);
  const onDeleteUserId = useStore(state => state.onDeleteUserId);
  const navigate = useNavigate();
  const elementRef = useOnclickOutside(popoverRef.current?.hide as () => {});

  const onSignOut = useCallback(() => {
    onDeleteUserId();
    signOut().execute();
    navigate(RoutePaths.SignIn, { replace: true });
  }, [signOut, onDeleteUserId]);

  return {
    popoverRef,
    onSignOut,
    elementRef,
  };
};
