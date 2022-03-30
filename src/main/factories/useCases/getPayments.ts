import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetPayments } from '@/useCases/GetPayments';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeGetPayments = () => {
  const userGateway = new UserGateway();
  const paymentGateway = new PaymentGateway();
  return new GetPayments(paymentGateway, userGateway);
};
