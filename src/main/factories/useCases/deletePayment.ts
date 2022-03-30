import { DeletePayment } from '@/useCases/DeletePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeDeletePayment = () => {
  const paymentGateway = new PaymentGateway();
  return new DeletePayment(paymentGateway);
};
