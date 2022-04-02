import { UpdatePayment } from '@/useCases/UpdatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeUpdatePayment = () => {
  const paymentGateway = new PaymentGateway();
  return new UpdatePayment(paymentGateway);
};
