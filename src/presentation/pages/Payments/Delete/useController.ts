import { useCallback, useEffect } from 'react';
import { useNotification } from 'react-hook-notification';

import { useMutation } from '@/presentation/hooks/useMutation';
import { useStore } from '@/presentation/store/useStore';
import { DeletePayment } from '@/useCases/DeletePayment';
import { Payment } from '@/entities/Payment';

type UseControllerHookProps = {
  deletePayment: typeof DeletePayment.prototype['execute'];
};

type UseControllerHook = (props: UseControllerHookProps) => {
  isLoading: boolean;
  payment: Payment | undefined;
  onDelete(id: string): void;
  onCloseModal(): void;
};

export const useController: UseControllerHook = ({ deletePayment }) => {
  const notification = useNotification({ position: 'top-left' });
  const onDeletePaymentStore = useStore(state => state.onDeletePayment);
  const payment = useStore(state => state.payment);
  const modalRef = useStore(state => state.modalRef);

  const { mutate, isError, reset, isLoading, isSuccess } =
    useMutation(deletePayment);

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

  const onCloseModal = useCallback(() => {
    modalRef?.closeModal();
  }, [modalRef]);

  useEffect(() => {
    if (isError) {
      dispatchErrorNotification(
        'Um erro ocorreu ao obter excluir o pagamento. Tente novamente!',
      );
      reset();
    }
  }, [dispatchErrorNotification, isError, reset]);

  useEffect(() => {
    if (isSuccess) {
      onDeletePaymentStore(String(payment?.id));
      dispatchSuccessNotification('Pagamento excluído!');
      onCloseModal();
    }
  }, [
    dispatchSuccessNotification,
    onCloseModal,
    isSuccess,
    onDeletePaymentStore,
  ]);

  const onDelete = useCallback(
    (id: string) => {
      mutate(id);
    },
    [mutate],
  );

  return {
    onDelete,
    isLoading,
    payment,
    onCloseModal,
  };
};
