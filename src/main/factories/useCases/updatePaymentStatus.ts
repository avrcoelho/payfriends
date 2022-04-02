import { UpdatePaymentStatus } from '@/useCases/UpdatePaymentStatus';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { UpdateStatusParams } from '@/useCases/ports/paymentGateway';

export const makeUpdatePaymentStatus: typeof UpdatePaymentStatus.prototype['execute'] =
  (params: UpdateStatusParams) => {
    const paymentGateway = new PaymentGateway();
    const updatePaymentStatus = new UpdatePaymentStatus(paymentGateway);
    return updatePaymentStatus.execute.call(updatePaymentStatus, params);
  };
