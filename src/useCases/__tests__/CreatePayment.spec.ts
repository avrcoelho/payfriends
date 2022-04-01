import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { CreatePayment } from '../CreatePayment';
import { GetUser } from '../GetUser';

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
  rest.post(`${config.baseUrl}/payments`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
  rest.get(`${config.baseUrl}/users/:id`, (_, res, ctx) => {
    return res(ctx.json(userResponse));
  }),
);

let createPayment: CreatePayment;
let paymentGateway: PaymentGateway;
let userGateway: UserGateway;
let getUser: GetUser;

describe('Create payment use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    userGateway = new UserGateway();
    getUser = new GetUser(userGateway);
    createPayment = new CreatePayment(paymentGateway, getUser);
  });

  it('should be able to create payment', async () => {
    const payment = await createPayment.execute({
      status: false,
      timestamp: Date.now(),
      value: 700,
      user: {
        id: '7',
      },
    });

    expect(payment).toHaveProperty('user');
  });
});
