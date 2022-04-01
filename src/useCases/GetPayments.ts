import { Payment } from '@/entities/Payment';
import { GetUser } from './GetUser';
import { PaymentGatewayPort, GetParams } from './ports/paymentGateway';

export class GetPayments {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly getUser: GetUser,
  ) {}

  async execute(params: GetParams): Promise<Payment[]> {
    const payments = await this.paymentGateway.get(params);
    const paymentsSerialized = await Promise.all(
      payments.map(async payment => {
        const user = await this.getUser.execute(payment.id);
        return { ...payment, user };
      }),
    );
    return paymentsSerialized;
  }
}
