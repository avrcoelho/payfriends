import { PaymentGatewayPort } from './ports/paymentGateway';

export class DeletePayments {
  constructor(private readonly paymentGateway: PaymentGatewayPort) {}

  async execute(id: string): Promise<void> {
    this.paymentGateway.deleteById(id);
  }
}
