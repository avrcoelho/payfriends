import { PaymentGatewayPort } from './ports/paymentGateway';

export class DeletePayment {
  constructor(private readonly paymentGateway: PaymentGatewayPort) {}

  async execute(id: string): Promise<void> {
    await this.paymentGateway.deleteById(id);
  }
}
