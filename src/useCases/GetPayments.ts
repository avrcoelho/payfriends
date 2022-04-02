import { GetUser } from './GetUser';
import {
  PaymentGatewayPort,
  GetParams,
  PaymentData,
} from './ports/paymentGateway';

export class GetPayments {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly getUser: GetUser,
  ) {}

  async execute(params: GetParams): Promise<PaymentData> {
    const paymentsData = await this.paymentGateway.get(params);
    const paymentsSerialized = await Promise.all(
      paymentsData.data.map(async payment => {
        const user = await this.getUser.execute(payment.id);
        return { ...payment, user };
      }),
    );
    return { data: paymentsSerialized, total: paymentsData.total };
  }
}
