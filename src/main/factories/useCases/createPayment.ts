import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { CreatePayment } from '@/useCases/CreatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeCreatePayment = () => {
  const userGateway = new UserGateway();
  const paymentGateway = new PaymentGateway();
  return new CreatePayment(paymentGateway, userGateway);
};
