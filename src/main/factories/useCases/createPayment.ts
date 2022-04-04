import { CreatePayment } from '@/useCases/CreatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeCreatePayment: typeof CreatePayment.prototype['execute'] =
  params => {
    const paymentGateway = new PaymentGateway();
    const createPayment = new CreatePayment(paymentGateway);
    return createPayment.execute.call(createPayment, params);
  };
