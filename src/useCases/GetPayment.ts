import { Payment } from '@/entities/Payment';
import { GetUser } from './GetUser';
import { PaymentGatewayPort } from './ports/paymentGateway';

export class GetPayment {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly getUser: GetUser,
  ) {}

  async execute(id: string): Promise<Payment> {
    const payment = await this.paymentGateway.getById(id);
    const user = await this.getUser.execute(payment.id);
    return { ...payment, user };
  }
}
