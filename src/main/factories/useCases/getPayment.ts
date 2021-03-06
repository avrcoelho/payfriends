import { GetPayment } from '@/useCases/GetPayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeGetPayment = () => {
  const paymentGateway = new PaymentGateway();
  return new GetPayment(paymentGateway);
};
