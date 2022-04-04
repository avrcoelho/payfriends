import { GetPayments } from '@/useCases/GetPayments';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { makeGetUsers } from './getUsers';

export const makeGetPayments = () => {
  const paymentGateway = new PaymentGateway();
  return new GetPayments(paymentGateway, makeGetUsers());
};
