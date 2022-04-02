import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { UpdatePaymentStatus } from '@/useCases/UpdatePaymentStatus';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { GetUser } from '@/useCases/GetUser';

export const makeUpdatePaymentStatus = () => {
  const userGateway = new UserGateway();
  const getUser = new GetUser(userGateway);
  const paymentGateway = new PaymentGateway();
  return new UpdatePaymentStatus(paymentGateway, getUser);
};
