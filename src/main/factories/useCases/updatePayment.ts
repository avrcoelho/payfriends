import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { UpdatePayment } from '@/useCases/UpdatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { GetUser } from '@/useCases/GetUser';

export const makeUpdatePayment = () => {
  const userGateway = new UserGateway();
  const getUser = new GetUser(userGateway);
  const paymentGateway = new PaymentGateway();
  return new UpdatePayment(paymentGateway, getUser);
};
