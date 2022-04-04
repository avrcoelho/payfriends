import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetPayments } from '../GetPayments';
import { GetUsers } from '../GetUsers';

const user = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: config.baseUrl,
};
const paymentResponse = {
  user,
  id: '7',
  title: 'Boeleto',
  value: 700,
  date: '2022-03-20',
  status: true,
};

const server = setupServer(
  rest.get(`${config.baseUrl}/payments`, (_, res, ctx) => {
    return res(ctx.json([paymentResponse]));
  }),
  rest.get(`${config.baseUrl}/users`, (_, res, ctx) => {
    return res(ctx.json([user]));
  }),
);

let getPayments: GetPayments;
let getUsers: GetUsers;
let paymentGateway: PaymentGateway;
let userGateway: UserGateway;

describe('Get payments use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    userGateway = new UserGateway();
    getUsers = new GetUsers(userGateway);
    getPayments = new GetPayments(paymentGateway, getUsers);
  });

  it('should be able to get payments', async () => {
    const paymentsData = await getPayments.execute({
      limit: 5,
      page: 1,
    });

    expect(paymentsData.data).toHaveLength(1);
  });

  it('should be able to get payments by user name', async () => {
    const paymentsData = await getPayments.execute({
      limit: 5,
      page: 1,
      search: 'test',
    });

    expect(paymentsData.data).toHaveLength(1);
  });
});
