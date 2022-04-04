import { UpdatePayment } from '@/useCases/UpdatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { GetUser } from '@/useCases/GetUser';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';

export const makeUpdatePayment: typeof UpdatePayment.prototype['execute'] =
  params => {
    const paymentGateway = new PaymentGateway();
    const userGateway = new UserGateway();
    const getUser = new GetUser(userGateway);
    const updatePayment = new UpdatePayment(paymentGateway, getUser);
    return updatePayment.execute.call(updatePayment, params);
  };
