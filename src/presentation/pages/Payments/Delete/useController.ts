import { useCallback, useEffect, useRef } from 'react';
import { useNotification } from 'react-hook-notification';

import { useMutation } from '@/presentation/hooks/useMutation';
import { useStore } from '@/presentation/store/useStore';
import { DeletePayment } from '@/useCases/DeletePayment';

type UseControllerHookProps = {
  deletePayment: typeof DeletePayment.prototype['execute'];
  onCloseModal(): void;
};

type UseControllerHook = (props: UseControllerHookProps) => {
  isLoading: boolean;
  onDelete(id: string): void;
};

export const useController: UseControllerHook = ({
  deletePayment,
  onCloseModal,
}) => {
  const notification = useNotification({ position: 'top-left' });
  const onDeletePaymentStore = useStore(state => state.onDeletePayment);
  const paymentIdRef = useRef<string>();

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
      onDeletePaymentStore(String(paymentIdRef.current));
      dispatchSuccessNotification('Pagamento excluído!');
      paymentIdRef.current = undefined;
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
  };
};
