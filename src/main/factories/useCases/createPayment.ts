import { CreatePayment } from '@/useCases/CreatePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { CreateParams } from '@/useCases/ports/paymentGateway';

export const makeCreatePayment: typeof CreatePayment.prototype['execute'] = (
  params: CreateParams,
) => {
  const paymentGateway = new PaymentGateway();
  const createPayment = new CreatePayment(paymentGateway);
  return createPayment.execute.call(createPayment, params);
};
