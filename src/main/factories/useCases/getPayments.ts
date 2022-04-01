import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetPayments } from '@/useCases/GetPayments';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { GetUser } from '@/useCases/GetUser';

export const makeGetPayments = () => {
  const userGateway = new UserGateway();
  const getUser = new GetUser(userGateway);
  const paymentGateway = new PaymentGateway();
  return new GetPayments(paymentGateway, getUser);
};
