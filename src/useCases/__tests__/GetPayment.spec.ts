import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetPayment } from '../GetPayment';

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
  rest.get(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
  rest.get(`${config.baseUrl}/users/:id`, (_, res, ctx) => {
    return res(ctx.json(userResponse));
  }),
);

let getPayment: GetPayment;
let paymentGateway: PaymentGateway;
let userGateway: UserGateway;

describe('Get payment use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    userGateway = new UserGateway();
    getPayment = new GetPayment(paymentGateway, userGateway);
  });

  it('should be able to get payment', async () => {
    const payment = await getPayment.execute('7');

    expect(payment).toHaveProperty('user');
  });
});
