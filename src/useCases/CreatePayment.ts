import { Payment } from '@/entities/Payment';
import { CreateParams, PaymentGatewayPort } from './ports/paymentGateway';

export class CreatePayment {
  constructor(private readonly paymentGateway: PaymentGatewayPort) {}

  async execute(params: CreateParams): Promise<Payment> {
    return this.paymentGateway.create(params);
  }
}
