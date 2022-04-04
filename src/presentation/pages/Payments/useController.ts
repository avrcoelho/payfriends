import {
  useCallback,
  useEffect,
  useRef,
  useState,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';
import { useNotification } from 'react-hook-notification';

import { User } from '@/entities/User';
import { Payment } from '@/entities/Payment';
import { GetUser } from '@/useCases/GetUser';
import { PaymentData } from '@/useCases/ports/paymentGateway';
import { GetPayments } from '@/useCases/GetPayments';
import { useQuery } from '@/presentation/hooks/useQuery';
import { useStore } from '@/presentation/store/useStore';
import { ModalType } from '@/presentation/types/ModalType';
import { ModalHandles } from '@/presentation/components/Modal';
import { useDebouncedValue } from '@/presentation/hooks/useDebouncedValue';

type UseControllerHookProps = {
  getUser: () => GetUser;
  getPayments: () => GetPayments;
};

type UseControllerHook = (props: UseControllerHookProps) => {
  isLoadingUser: boolean;
  hasPaymentsData: boolean;
  isLoadingPayments: boolean;
  user: User | undefined;
  paymentsData: PaymentData | undefined;
  page: number;
  limit: number;
  modalType: ModalType;
  paymentSelected: Payment | undefined;
  modalRef: RefObject<ModalHandles>;
  search: string;
  onSetSearch(value: string): void;
  onUpdateLimit(value: number): void;
  onUpdatePage(value: number): void;
  onOpenModalToCreate(): void;
};

export const useController: UseControllerHook = ({ getUser, getPayments }) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const searchValueDebounced = useDebouncedValue(search);

  const notification = useNotification({ position: 'top-left' });
  const userId = useStore(state => state.userId);
  const onSetPaymentsData = useStore(state => state.onSetPaymentsData);
  const hasRefetch = useStore(state => state.hasRefetch);
  const onRefetchStore = useStore(state => state.onRefetch);
  const paymentsData = useStore(state => state.paymentsData);
  const onSetModalRef = useStore(state => state.onSetModalRef);
  const onSetModalType = useStore(state => state.onSetModalType);
  const modalType = useStore(state => state.modalType);
  const paymentSelected = useStore(state => state.payment);
  const modalRef = useRef<ModalHandles>(null);
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
    data,
    refetch,
  } = useQuery(
    () => getPayments().execute({ limit, page, search: searchValueDebounced }),
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
  }, [user, refetch, limit, page, searchValueDebounced]);

  useEffect(() => {
    if (hasRefetch) {
      refetch();
      onRefetchStore();
    }
  }, [hasRefetch, onRefetchStore]);

  useEffect(() => {
    if (isSuccessUser && data) {
      onSetPaymentsData(data);
    }
  }, [isSuccessUser, data]);

  useEffect(() => {
    onSetModalRef(modalRef.current);
  }, [onSetModalRef]);

  const onUpdatePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const onUpdateLimit = useCallback(
    (newLimit: number) => {
      setLimit(newLimit);
      onUpdatePage(1);
    },
    [onUpdatePage],
  );

  const onOpenModalToCreate = useCallback(() => {
    onSetModalType('create');
    modalRef.current?.openModal();
  }, [onSetModalType]);

  const onSetSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const hasPaymentsData = !!Object.keys(paymentsData).length;

  useEffect(() => {
    onUpdatePage(1);
  }, [searchValueDebounced, onUpdatePage]);

  return {
    isLoadingUser,
    user,
    isLoadingPayments,
    limit,
    page,
    paymentsData,
    onUpdateLimit,
    onUpdatePage,
    hasPaymentsData,
    modalType,
    paymentSelected,
    modalRef,
    onOpenModalToCreate,
    onSetSearch,
    search,
  };
};
