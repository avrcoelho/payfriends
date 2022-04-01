import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetPayment } from '@/useCases/GetPayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { GetUser } from '@/useCases/GetUser';

export const makeGetPayment = () => {
  const userGateway = new UserGateway();
  const getUser = new GetUser(userGateway);
  const paymentGateway = new PaymentGateway();
  return new GetPayment(paymentGateway, getUser);
};
