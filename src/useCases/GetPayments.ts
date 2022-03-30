import { Payment } from '@/entities/Payment';
import { PaymentGatewayPort, GetParams } from './ports/paymentGateway';
import { UserGatewayPort } from './ports/userGateway';

export class GetPayments {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly userGateway: UserGatewayPort,
  ) {}

  async execute(params: GetParams): Promise<Payment[]> {
    const payments = await this.paymentGateway.get(params);
    const paymentsSerialized = await Promise.all(
      payments.map(async payment => {
        const user = await this.userGateway.getById(payment.id);
        return { ...payment, user };
      }),
    );
    return paymentsSerialized;
  }
}
