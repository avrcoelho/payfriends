import { CreatePayment } from '@/useCases/CreatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeCreatePayment = () => {
  const paymentGateway = new PaymentGateway();
  return new CreatePayment(paymentGateway);
};
