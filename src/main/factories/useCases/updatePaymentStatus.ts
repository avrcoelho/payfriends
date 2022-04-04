import { UpdatePaymentStatus } from '@/useCases/UpdatePaymentStatus';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';

export const makeUpdatePaymentStatus: typeof UpdatePaymentStatus.prototype['execute'] =
  params => {
    const paymentGateway = new PaymentGateway();
    const updatePaymentStatus = new UpdatePaymentStatus(paymentGateway);
    return updatePaymentStatus.execute.call(updatePaymentStatus, params);
  };
