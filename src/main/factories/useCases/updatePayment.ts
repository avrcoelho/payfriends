import { UpdatePayment } from '@/useCases/UpdatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { makeGetUser } from './getUser';

export const makeUpdatePayment = () => {
  const paymentGateway = new PaymentGateway();
  return new UpdatePayment(paymentGateway, makeGetUser());
};
