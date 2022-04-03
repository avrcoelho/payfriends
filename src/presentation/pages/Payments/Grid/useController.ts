import { useCallback, useEffect, useRef } from 'react';
import { useNotification } from 'react-hook-notification';

import { UpdatePaymentStatus } from '@/useCases/UpdatePaymentStatus';
import { useMutation } from '@/presentation/hooks/useMutation';
import { useStore } from '@/presentation/store/useStore';
import { UpdateStatusParams } from '@/useCases/ports/paymentGateway';

type UseControllerProps = {
  updatePaymentStatus: typeof UpdatePaymentStatus.prototype['execute'];
};

type UseControllerHook = (props: UseControllerProps) => {
  onUpdateStatus(params: UpdateStatusParams): void;
  onDelete(paymentId: string): void;
  onUpdate(paymentId: string): void;
};

export const useController: UseControllerHook = ({ updatePaymentStatus }) => {
  const {
    mutate: mutateUpdateStatus,
    isError: isErrorUpdateStatus,
    reset: resetUpdateStatus,
  } = useMutation(updatePaymentStatus);
  const notification = useNotification({ position: 'top-left' });
  const onUpdatePaymentStatus = useStore(state => state.onUpdatePaymentStatus);
  const modalRef = useStore(state => state.modalRef);
  const onGetPayment = useStore(state => state.onGetPayment);
  const updateStatusDataRef = useRef<UpdateStatusParams>();

  const dispatchErrorNotification = useCallback(
    (message: string) => {
      notification.error({
        text: message,
      });
    },
    [notification],
  );

  useEffect(() => {
    if (isErrorUpdateStatus) {
      dispatchErrorNotification(
        'Um erro ocorreu ao obter atualizar o status do pagamento!',
      );
      const { id, status } = updateStatusDataRef.current as UpdateStatusParams;
      onUpdatePaymentStatus({ id, status: !status });
      updateStatusDataRef.current = undefined;
    }
    resetUpdateStatus();
  }, [dispatchErrorNotification, resetUpdateStatus, isErrorUpdateStatus]);

  const onUpdateStatus = useCallback(
    ({ id, status }: UpdateStatusParams) => {
      updateStatusDataRef.current = { id, status: !status };
      onUpdatePaymentStatus({ id, status: !status });
      mutateUpdateStatus({ id, status: !status });
    },
    [mutateUpdateStatus, onUpdatePaymentStatus],
  );

  const onDelete = useCallback(
    (paymentId: string) => {
      onGetPayment(paymentId, 'delete');
      modalRef?.openModal();
    },
    [onGetPayment, modalRef],
  );

  const onUpdate = useCallback(
    (paymentId: string) => {
      onGetPayment(paymentId, 'update');
      modalRef?.openModal();
    },
    [onGetPayment, modalRef],
  );

  return {
    onUpdateStatus,
    onDelete,
    onUpdate,
  };
};
