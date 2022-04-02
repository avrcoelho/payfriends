import { UpdatePaymentStatus } from '@/useCases/UpdatePaymentStatus';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeUpdatePaymentStatus = () => {
  const paymentGateway = new PaymentGateway();
  return new UpdatePaymentStatus(paymentGateway);
};
