import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { CreatePayment } from '../CreatePayment';

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
  timestamp: Date.now(),
  status: true,
};

const server = setupServer(
  rest.post(`${config.baseUrl}/payments`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
);

let createPayment: CreatePayment;
let paymentGateway: PaymentGateway;

describe('Create payment use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    createPayment = new CreatePayment(paymentGateway);
  });

  it('should be able to create payment', async () => {
    const payment = await createPayment.execute({
      title: 'Boeleto',
      status: false,
      timestamp: Date.now(),
      value: 700,
      userId: '7',
    });

    expect(payment).toHaveProperty('user');
  });
});
