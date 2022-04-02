import { Payment } from '@/entities/Payment';
import { PaymentGatewayPort, UpdateParams } from './ports/paymentGateway';

export class UpdatePayment {
  constructor(private readonly paymentGateway: PaymentGatewayPort) {}

  async execute(params: UpdateParams): Promise<Payment> {
    return this.paymentGateway.updateStatus(params);
  }
}
