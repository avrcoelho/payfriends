import { Payment } from '@/entities/Payment';
import { CreateParams, PaymentGatewayPort } from './ports/paymentGateway';
import { UserGatewayPort } from './ports/userGateway';

export class CreatePayments {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly userGateway: UserGatewayPort,
  ) {}

  async execute(params: CreateParams): Promise<Payment> {
    const payment = await this.paymentGateway.create(params);
    const user = await this.userGateway.getById(payment.id);
    return { ...payment, user };
  }
}
