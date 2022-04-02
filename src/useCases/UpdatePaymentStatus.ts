import { Payment } from '@/entities/Payment';
import { PaymentGatewayPort, UpdateStatusParams } from './ports/paymentGateway';

export class UpdatePaymentStatus {
  constructor(private readonly paymentGateway: PaymentGatewayPort) {}

  async execute(params: UpdateStatusParams): Promise<Payment> {
    return this.paymentGateway.updateStatus(params);
  }
}
