import { Payment } from '@/entities/Payment';
import { GetUser } from './GetUser';
import { PaymentGatewayPort, UpdateParams } from './ports/paymentGateway';

export class UpdatePayment {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly getUser: GetUser,
  ) {}

  async execute(params: UpdateParams): Promise<Payment> {
    const payment = await this.paymentGateway.update(params);
    const user = await this.getUser.execute(payment.userId);
    return { ...payment, user };
  }
}
