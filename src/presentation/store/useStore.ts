import create from 'zustand';

import { Payment } from '@/entities/Payment';
import { PaymentData } from '@/useCases/ports/paymentGateway';
import { ModalType } from '../types/ModalType';
import { ModalHandles } from '../components/Modal';

type PaymentStatusProps = {
  id: string;
  status: boolean;
};

type StoreState = {
  userId: string | number | null;
  hasRefetch: boolean;
  paymentsData: PaymentData;
  payment: Payment | undefined;
  modalType: ModalType;
  modalRef: ModalHandles | null;
  onSaveUserId(userId: string): void;
  onRefetch(): void;
  onSetPaymentsData(paymentsData: PaymentData): void;
  onUpdatePayment(payment: Payment): void;
  onDeletePayment(paymentId: string): void;
  onUpdatePaymentStatus(props: PaymentStatusProps): void;
  onGetPayment(paymentId: string, type: ModalType): void;
  onSetModalRef(modalRef: ModalHandles | null): void;
  onDeleteUserId(): void;
};

export const useStore = create<StoreState>(set => ({
  userId: '',
  hasRefetch: false,
  paymentsData: {} as PaymentData,
  payment: undefined,
  modalType: undefined,
  modalRef: null,
  onSaveUserId: userId => {
    set(state => ({ ...state, userId }));
  },
  onDeleteUserId: () => {
    set(state => ({ ...state, userId: null }));
  },
  onSetPaymentsData: paymentsData => {
    set(state => ({ ...state, paymentsData }));
  },
  onRefetch: () => {
    set(state => ({ ...state, hasRefetch: !state.hasRefetch }));
  },
  onSetModalRef: modalRef => {
    set(state => ({ ...state, modalRef }));
  },
  onUpdatePayment: payment => {
    set(state => ({
      ...state,
      paymentsData: {
        ...state.paymentsData,
        data: state.paymentsData?.data?.map(pmt =>
          pmt.id === payment.id ? payment : pmt,
        ),
      },
    }));
  },
  onUpdatePaymentStatus: ({ id, status }) => {
    set(state => ({
      ...state,
      paymentsData: {
        ...state.paymentsData,
        data: state.paymentsData?.data?.map(pmt =>
          pmt.id === id ? { ...pmt, status } : pmt,
        ),
      },
    }));
  },
  onDeletePayment: paymentId => {
    set(state => ({
      ...state,
      paymentsData: {
        ...state.paymentsData,
        data: state.paymentsData?.data.filter(
          payment => payment.id !== paymentId,
        ),
        total: state.paymentsData.total - 1,
      },
    }));
  },
  onGetPayment: (paymentId, modalType) => {
    set(state => ({
      ...state,
      payment: state.paymentsData?.data.find(
        payment => payment.id === paymentId,
      ),
      modalType,
    }));
  },
}));
