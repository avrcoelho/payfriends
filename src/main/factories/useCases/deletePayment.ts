import { DeletePayment } from '@/useCases/DeletePayment';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeDeletePayment: typeof DeletePayment.prototype['execute'] =
  id => {
    const paymentGateway = new PaymentGateway();
    const deletePayment = new DeletePayment(paymentGateway);
    return deletePayment.execute.call(deletePayment, id);
  };
