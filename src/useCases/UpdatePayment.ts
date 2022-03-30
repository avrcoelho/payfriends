import { Payment } from '@/entities/Payment';
import { PaymentGatewayPort } from './ports/paymentGateway';

export class UpdatePayments {
  constructor(private readonly paymentGateway: PaymentGatewayPort) {}

  async execute(params: Payment): Promise<Payment> {
    return this.paymentGateway.update(params);
  }
}
