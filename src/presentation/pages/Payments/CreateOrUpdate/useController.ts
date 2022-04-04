import { useCallback, useEffect, useMemo } from 'react';
import {
  Control,
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
import { ModalType } from '@/presentation/types/ModalType';

type UseControllerHookProps = {
  createPayment: typeof CreatePayment.prototype['execute'];
  updatePayment: typeof UpdatePayment.prototype['execute'];
  getUsers(): GetUsers;
};

type UseControllerHook = (props: UseControllerHookProps) => {
  isLoading: boolean;
  handleSubmit: UseFormHandleSubmit<CreateParams>;
  errors: Partial<Record<keyof CreateParams, FieldError>>;
  register: UseFormRegister<CreateParams>;
  users: SelectOption[];
  modalType: ModalType;
  control: Control<CreateParams, any>;
  onSubmit(params: UpdateParams | CreateParams): void;
  onCloseModal(): void;
};

export const useController: UseControllerHook = ({
  createPayment,
  updatePayment,
  getUsers,
}) => {
  const resolver = useYupValidationResolver<CreateParams>(paymentValidator);
  const notification = useNotification({ position: 'top-left' });
  const onUpdatePaymentStore = useStore(state => state.onUpdatePayment);
  const onRefetchStore = useStore(state => state.onRefetch);
  const modalRef = useStore(state => state.modalRef);
  const modalType = useStore(state => state.modalType);
  const paymentToUpdate = useStore(state =>
    modalType === 'update' ? state.payment : undefined,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateParams>({
    resolver,
    defaultValues: {
      userId: paymentToUpdate?.userId,
      value: paymentToUpdate?.value,
      date: paymentToUpdate?.date,
      title: paymentToUpdate?.title,
    },
  });

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

  const onCloseModal = useCallback(() => {
    modalRef?.closeModal();
  }, [modalRef]);

  useEffect(() => {
    if (isSuccessCreate) {
      dispatchSuccessNotification('Pagamento adicionado!');
    }
    if (isSuccessUpdate) {
      dispatchSuccessNotification('Pagamento atualizado!');
    }
    if (isSuccessCreate || isSuccessUpdate) {
      onCloseModal();
    }
  }, [
    dispatchSuccessNotification,
    onCloseModal,
    isSuccessCreate,
    isSuccessUpdate,
  ]);

  const onCreate = useCallback(
    async (params: CreateParams) => {
      const paymentCreated = await mutateCreate(params);
      if (paymentCreated) {
        onRefetchStore();
      }
    },
    [onRefetchStore, mutateCreate],
  );

  const onUpdate = useCallback(
    async (params: UpdateParams) => {
      const paymentUpdated = await mutateUpdate({
        ...params,
        id: paymentToUpdate?.id,
        status: paymentToUpdate?.status,
      } as UpdateParams);
      if (paymentUpdated) {
        onUpdatePaymentStore({ ...paymentUpdated });
      }
    },
    [onUpdatePaymentStore, mutateCreate, paymentToUpdate],
  );

  const onSubmit = useCallback(
    async (params: CreateParams | UpdateParams) => {
      if (modalType === 'create') {
        onCreate(params as UpdateParams);
      } else {
        onUpdate(params as UpdateParams);
      }
    },
    [onUpdate, onCreate],
  );

  return {
    onSubmit,
    handleSubmit,
    isLoading: isLoadingCreate || isLoadingUpdate,
    errors,
    register,
    users: usersParsed,
    onCloseModal,
    modalType,
    control,
  };
};
