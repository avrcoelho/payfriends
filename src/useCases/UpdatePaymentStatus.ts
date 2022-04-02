import { Payment } from '@/entities/Payment';
import { GetUser } from './GetUser';
import { PaymentGatewayPort, UpdateStatusParams } from './ports/paymentGateway';

export class UpdatePaymentStatus {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly getUser: GetUser,
  ) {}

  async execute(params: UpdateStatusParams): Promise<Payment> {
    const payment = await this.paymentGateway.updateStatus(params);
    const user = await this.getUser.execute(payment.id);
    return { ...payment, user };
  }
}
