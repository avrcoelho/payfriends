import { Payment } from '@/entities/Payment';
import { PaymentGatewayPort } from './ports/paymentGateway';

export class GetPayment {
  constructor(private readonly paymentGateway: PaymentGatewayPort) {}

  async execute(id: string): Promise<Payment> {
    return this.paymentGateway.getById(id);
  }
}
