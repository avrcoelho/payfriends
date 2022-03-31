import { useCallback } from 'react';
import {
  useForm,
  UseFormRegister,
  FieldError,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useNotification } from 'react-hook-notification';
import { useNavigate } from 'react-router-dom';

import { SignInParams } from '@/useCases/ports/userGateway';
import { RoutePaths } from '@/presentation/constants/RoutePaths';
import { useIsMounted } from '@/presentation/hooks/useIsMounted';
import { useToggle } from '@/presentation/hooks/useToggle';
import { useYupValidationResolver } from '@/presentation/hooks/useYupValidationResolver';
import { signInValidator } from '@/presentation/validators/signIn';
import { SignIn } from '@/useCases/SignIn';

type UseControllerProps = {
  signIn(): SignIn;
};

type UseController = (props: UseControllerProps) => {
  register: UseFormRegister<SignInParams>;
  errors: Partial<Record<keyof SignInParams, FieldError>>;
  handleSubmit: UseFormHandleSubmit<SignInParams>;
  isLoading: boolean;
  onSubmit(params: SignInParams): Promise<void>;
};

export const useController: UseController = ({ signIn }) => {
  const resolver = useYupValidationResolver<SignInParams>(signInValidator);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParams>({ resolver });
  const [isLoading, toggleIsLoading] = useToggle(false);
  const notification = useNotification({ position: 'top-left' });
  const navigate = useNavigate();

  const dispatchErrorNotification = useCallback(() => {
    notification.error({
      text: 'Um erro ocorreu durante a autenticação. Por favor verifique suas credenciais',
    });
  }, [notification]);

  const isMounted = useIsMounted();

  const finallyOnSubmit = useCallback(() => {
    if (isMounted()) {
      toggleIsLoading();
    }
  }, [isMounted, toggleIsLoading]);

  const onSubmit = useCallback(
    async (params: SignInParams) => {
      toggleIsLoading();
      try {
        await signIn().execute(params);
        navigate(RoutePaths.Payments, { replace: true });
      } catch {
        dispatchErrorNotification();
      } finally {
        finallyOnSubmit();
      }
    },
    [
      dispatchErrorNotification,
      finallyOnSubmit,
      toggleIsLoading,
      navigate,
      signIn,
    ],
  );

  return {
    errors,
    handleSubmit,
    onSubmit,
    register,
    isLoading,
  };
};
