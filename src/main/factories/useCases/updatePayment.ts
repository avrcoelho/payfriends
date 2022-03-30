import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { UpdatePayment } from '@/useCases/UpdatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeUpdatePayment = () => {
  const userGateway = new UserGateway();
  const paymentGateway = new PaymentGateway();
  return new UpdatePayment(paymentGateway, userGateway);
};
