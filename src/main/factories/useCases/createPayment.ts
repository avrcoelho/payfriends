import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { CreatePayment } from '@/useCases/CreatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { GetUser } from '@/useCases/GetUser';

export const makeCreatePayment = () => {
  const userGateway = new UserGateway();
  const getUser = new GetUser(userGateway);
  const paymentGateway = new PaymentGateway();
  return new CreatePayment(paymentGateway, getUser);
};
