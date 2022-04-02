import {
  PaymentGatewayPort,
  GetParams,
  PaymentData,
} from './ports/paymentGateway';

export class GetPayments {
  constructor(private readonly paymentGateway: PaymentGatewayPort) {}

  async execute(params: GetParams): Promise<PaymentData> {
    const paymentsData = await this.paymentGateway.get(params);
    return { data: paymentsData.data, total: paymentsData.total };
  }
}
