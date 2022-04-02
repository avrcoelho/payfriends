import create from 'zustand';

import { Payment } from '@/entities/Payment';

type PaymentStatusProps = {
  id: string;
  status: boolean;
};

type StoreState = {
  userId: string | number | null;
  payments: Payment[];
  onSaveUserId(userId: string): void;
  onSetPayments(payments: Payment[]): void;
  onUpdatePayment(payment: Payment): void;
  onDeletePayment(paymentId: string): void;
  onUpdatePaymentStatus(props: PaymentStatusProps): void;
  onDeleteUserId(): void;
};

export const useStore = create<StoreState>(set => ({
  userId: '',
  payments: [],
  onSaveUserId: userId => {
    set(state => ({ ...state, userId }));
  },
  onDeleteUserId: () => {
    set(state => ({ ...state, userId: null }));
  },
  onSetPayments: payments => {
    set(state => ({ ...state, payments }));
  },
  onUpdatePayment: payment => {
    set(state => ({
      ...state,
      payments: state.payments.map(pmt =>
        pmt.id === payment.id ? payment : pmt,
      ),
    }));
  },
  onUpdatePaymentStatus: ({ id, status }) => {
    set(state => ({
      ...state,
      payments: state.payments.map(pmt =>
        pmt.id === id ? { ...pmt, status } : pmt,
      ),
    }));
  },
  onDeletePayment: paymentId => {
    set(state => ({
      ...state,
      payments: state.payments.filter(payment => payment.id !== paymentId),
    }));
  },
}));
