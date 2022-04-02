import { useCallback, useEffect, useRef } from 'react';
import { useNotification } from 'react-hook-notification';

import { UpdatePaymentStatus } from '@/useCases/UpdatePaymentStatus';
import { useMutation } from '@/presentation/hooks/useMutation';
import { useStore } from '@/presentation/store/useStore';

type UseControllerProps = {
  updatePaymentStatus(): UpdatePaymentStatus;
};

type UseControllerHook = (props: UseControllerProps) => {
  onUpdateStatus(params: UpdateStatusParams): void;
};

type UpdateStatusParams = {
  status: boolean;
  id: string;
};

export const useController: UseControllerHook = ({ updatePaymentStatus }) => {
  const {
    mutate: mutateUpdateStatus,
    isError: isErrorUpdateStatus,
    reset: resetUpdateStatus,
  } = useMutation(updatePaymentStatus().execute);
  const notification = useNotification({ position: 'top-left' });
  const onUpdatePaymentStatus = useStore(state => state.onUpdatePaymentStatus);
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
      updateStatusDataRef.current = { id, status: !status };
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

  return {
    onUpdateStatus,
  };
};
