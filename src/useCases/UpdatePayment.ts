import { Payment } from '@/entities/Payment';
import { PaymentGatewayPort, UpdateParams } from './ports/paymentGateway';
import { UserGatewayPort } from './ports/userGateway';

export class UpdatePayment {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly userGateway: UserGatewayPort,
  ) {}

  async execute(params: UpdateParams): Promise<Payment> {
    const payment = await this.paymentGateway.update(params);
    const user = await this.userGateway.getById(payment.id);
    return { ...payment, user };
  }
}
