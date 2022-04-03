import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  FieldError,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { useNotification } from 'react-hook-notification';

import { CreatePayment } from '@/useCases/CreatePayment';
import { CreateParams, UpdateParams } from '@/useCases/ports/paymentGateway';
import { useYupValidationResolver } from '@/presentation/hooks/useYupValidationResolver';
import { paymentValidator } from '@/presentation/validators/payment';
import { useMutation } from '@/presentation/hooks/useMutation';
import { UpdatePayment } from '@/useCases/UpdatePayment';
import { useQuery } from '@/presentation/hooks/useQuery';
import { GetUsers } from '@/useCases/GetUsers';
import { SelectOption } from '@/presentation/types/SelectOption';
import { useStore } from '@/presentation/store/useStore';
import { Payment } from '@/entities/Payment';

type UseControllerHookProps = {
  createPayment: typeof CreatePayment.prototype['execute'];
  updatePayment: typeof UpdatePayment.prototype['execute'];
  getUsers(): GetUsers;
  onCloseModal(): void;
};

type UseControllerHook = (props: UseControllerHookProps) => {
  isLoading: boolean;
  handleSubmit: UseFormHandleSubmit<CreateParams>;
  errors: Partial<Record<keyof CreateParams, FieldError>>;
  register: UseFormRegister<CreateParams>;
  users: SelectOption[];
  onCreate(params: CreateParams): void;
  onUpdate(params: UpdateParams): void;
};

export const useController: UseControllerHook = ({
  createPayment,
  onCloseModal,
  updatePayment,
  getUsers,
}) => {
  const resolver = useYupValidationResolver<CreateParams>(paymentValidator);
  const notification = useNotification({ position: 'top-left' });
  const onUpdatePaymentStore = useStore(state => state.onUpdatePayment);
  const onRefetchStore = useStore(state => state.onRefetch);
  const paymentRef = useRef<Payment>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateParams>({ resolver });
  const { data: users } = useQuery(() => getUsers().execute());
  const {
    mutate: mutateCreate,
    isError: isErrorCreate,
    reset: resetCreate,
    isLoading: isLoadingCreate,
    isSuccess: isSuccessCreate,
  } = useMutation(createPayment);
  const {
    mutate: mutateUpdate,
    isError: isErrorUpdate,
    reset: resetUpdate,
    isLoading: isLoadingUpdate,
    isSuccess: isSuccessUpdate,
  } = useMutation(updatePayment);

  const usersParsed = useMemo(() => {
    return (
      users?.map(user => ({
        value: user.id,
        label: user.name,
      })) || []
    );
  }, [users]);

  const dispatchErrorNotification = useCallback(
    (message: string) => {
      notification.error({
        text: message,
      });
    },
    [notification],
  );

  const dispatchSuccessNotification = useCallback(
    (message: string) => {
      notification.success({
        text: message,
      });
    },
    [notification],
  );

  useEffect(() => {
    if (isErrorCreate) {
      dispatchErrorNotification(
        'Um erro ocorreu ao obter adicionar o pagamento. Tente novamente!',
      );
      resetCreate();
    }
    if (isErrorUpdate) {
      dispatchErrorNotification(
        'Um erro ocorreu ao atualizar o pagamento. Tente novamente!',
      );
      resetUpdate();
    }
  }, [
    dispatchErrorNotification,
    isErrorCreate,
    isErrorUpdate,
    resetUpdate,
    resetCreate,
  ]);

  useEffect(() => {
    if (isSuccessCreate) {
      dispatchSuccessNotification('Pagamento adicionado!');
      onRefetchStore();
    }
    if (isSuccessUpdate) {
      onUpdatePaymentStore(paymentRef.current as Payment);
      dispatchSuccessNotification('Pagamento atualizado!');
      paymentRef.current = undefined;
    }
    if (isSuccessCreate || isSuccessUpdate) {
      onCloseModal();
    }
  }, [
    dispatchSuccessNotification,
    onCloseModal,
    isSuccessCreate,
    isSuccessUpdate,
    onUpdatePaymentStore,
    onRefetchStore,
  ]);

  const onCreate = useCallback(
    (params: CreateParams) => {
      mutateCreate(params);
    },
    [mutateCreate],
  );

  const onUpdate = useCallback(
    (params: UpdateParams) => {
      mutateUpdate(params);
    },
    [mutateUpdate],
  );

  return {
    onCreate,
    onUpdate,
    handleSubmit,
    isLoading: isLoadingCreate || isLoadingUpdate,
    errors,
    register,
    users: usersParsed,
  };
};
