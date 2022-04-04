import { GetUsers } from './GetUsers';
import {
  PaymentGatewayPort,
  GetParams,
  PaymentData,
} from './ports/paymentGateway';

export class GetPayments {
  constructor(
    private readonly paymentGateway: PaymentGatewayPort,
    private readonly getUsers: GetUsers,
  ) {}

  async execute({ search, ...restParams }: GetParams): Promise<PaymentData> {
    let usersId = '';
    if (search) {
      const users = await this.getUsers.execute(search);
      usersId = users.map(user => user.id).join('|');
      if (!usersId) {
        return { data: [], total: 0 };
      }
    }
    const paymentsData = await this.paymentGateway.get({
      ...restParams,
      search: usersId,
    });
    return { data: paymentsData.data, total: paymentsData.total };
  }
}
