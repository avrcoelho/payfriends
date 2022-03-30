import { Payment } from '@/entities/Payment';
import { PaymentGatewayPort } from './ports/paymentGateway';
import { UserGatewayPort } from './ports/userGateway';

export class GetPayments {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly userGateway: UserGatewayPort,
  ) {}

  async execute(id: string): Promise<Payment> {
    const payment = await this.paymentGateway.getById(id);
    const user = await this.userGateway.getById(payment.id);
    return { ...payment, user };
  }
}
