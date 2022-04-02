import { useCallback, useEffect, useRef, useState } from 'react';
import { useNotification } from 'react-hook-notification';

import { User } from '@/entities/User';
import { Payment } from '@/entities/Payment';
import { useQuery } from '@/presentation/hooks/useQuery';
import { GetUser } from '@/useCases/GetUser';
import { GetPayments } from '@/useCases/GetPayments';
import { useStore } from '@/presentation/store/useStore';

type UseControllerHookProps = {
  getUser: () => GetUser;
  getPayments: () => GetPayments;
};

type UseControllerHook = (props: UseControllerHookProps) => {
  isLoadingUser: boolean;
  isLoadingPayments: boolean;
  user: User | undefined;
  payments: Payment[] | undefined;
  page: number;
  limit: number;
  onUpdateLimit(value: number): void;
  onUpdatePage(value: number): void;
};

export const useController: UseControllerHook = ({ getUser, getPayments }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const notification = useNotification({ position: 'top-left' });
  const userId = useStore(state => state.userId);
  const onSetPayments = useStore(state => state.onSetPayments);
  const {
    isError: isErrorUser,
    isSuccess: isSuccessUser,
    isLoading: isLoadingUser,
    data: user,
  } = useQuery(() => getUser().execute(String(userId)), {
    manualFetch: !userId,
  });
  const {
    isError: isErrorPayments,
    isLoading: isLoadingPayments,
    data: payments,
    refetch,
  } = useQuery(
    () => getPayments().execute({ limit, page, userId: String(userId) }),
    {
      manualFetch: true,
    },
  );

  const dispatchErrorNotification = useCallback(
    (message: string) => {
      notification.error({
        text: message,
      });
    },
    [notification],
  );

  useEffect(() => {
    if (isErrorUser) {
      dispatchErrorNotification(
        'Um erro ocorreu ao obter os dados do usuário. Tente novamente!',
      );
    }
    if (isErrorPayments) {
      dispatchErrorNotification(
        'Um erro ocorreu ao obter os pagamentos. Tente novamente!',
      );
    }
  }, [dispatchErrorNotification, isErrorUser, isErrorPayments]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch, limit, page]);

  useEffect(() => {
    if (isSuccessUser && payments) {
      onSetPayments(payments);
    }
  }, [isSuccessUser, payments]);

  const onUpdatePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const onUpdateLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
  }, []);

  return {
    isLoadingUser,
    user,
    isLoadingPayments,
    limit,
    page,
    payments,
    onUpdateLimit,
    onUpdatePage,
  };
};
