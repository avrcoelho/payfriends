import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetPayment } from '@/useCases/GetPayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeGetPayment = () => {
  const userGateway = new UserGateway();
  const paymentGateway = new PaymentGateway();
  return new GetPayment(paymentGateway, userGateway);
};
