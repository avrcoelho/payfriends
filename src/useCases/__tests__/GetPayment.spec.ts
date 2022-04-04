import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { GetPayment } from '../GetPayment';

const user = {
  id: '7',
  name: 'John Doe',
  nickname: 'johndoe',
  email: 'john@doe.com',
  avatar: config.baseUrl,
};
const paymentResponse = {
  user,
  title: 'Boeleto',
  id: '7',
  value: 700,
  date: '2022-03-20',
  status: true,
};

const server = setupServer(
  rest.get(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
);

let getPayment: GetPayment;
let paymentGateway: PaymentGateway;

describe('Get payment use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    getPayment = new GetPayment(paymentGateway);
  });

  it('should be able to get payment', async () => {
    const payment = await getPayment.execute('7');

    expect(payment).toHaveProperty('user');
  });
});
