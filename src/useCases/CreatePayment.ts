import { Payment } from '@/entities/Payment';
import { GetUser } from './GetUser';
import { CreateParams, PaymentGatewayPort } from './ports/paymentGateway';

export class CreatePayment {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly getUser: GetUser,
  ) {}

  async execute(params: CreateParams): Promise<Payment> {
    const payment = await this.paymentGateway.create(params);
    const user = await this.getUser.execute(payment.id);
    return { ...payment, user };
  }
}
