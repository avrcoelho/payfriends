import { DispatchWithoutAction } from 'react';

import { useToggle } from '@/presentation/hooks/useToggle';

type Hook = () => {
  passwordIsVisible: boolean;
  togglePasswordVisibility: DispatchWithoutAction;
  inputType: 'text' | 'password';
};

export const useController: Hook = () => {
  const [passwordIsVisible, togglePasswordVisibility] = useToggle(false);

  const inputType = passwordIsVisible ? 'text' : 'password';

  return {
    passwordIsVisible,
    togglePasswordVisibility,
    inputType,
  };
};
