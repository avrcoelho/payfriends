import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetPayments } from '../GetPayments';

const paymentResponse = {
  user: {
    id: '7',
  },
  id: '7',
  value: 700,
  timestamp: Date.now(),
  status: true,
};
const userResponse = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: config.baseUrl,
};

const server = setupServer(
  rest.get(`${config.baseUrl}/payments`, (_, res, ctx) => {
    return res(ctx.json([paymentResponse]));
  }),
  rest.get(`${config.baseUrl}/users/:id`, (_, res, ctx) => {
    return res(ctx.json(userResponse));
  }),
);

let getPayments: GetPayments;
let paymentGateway: PaymentGateway;
let userGateway: UserGateway;

describe('Get payments use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    userGateway = new UserGateway();
    getPayments = new GetPayments(paymentGateway, userGateway);
  });

  it('should be able to get payments', async () => {
    const payments = await getPayments.execute({
      limit: 5,
      page: 1,
      userId: '7',
    });

    expect(payments).toHaveLength(1);
  });
});
