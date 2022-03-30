import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { UpdatePayment } from '../UpdatePayment';

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
  rest.put(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
  rest.get(`${config.baseUrl}/users/:id`, (_, res, ctx) => {
    return res(ctx.json(userResponse));
  }),
);

let updatePayment: UpdatePayment;
let paymentGateway: PaymentGateway;
let userGateway: UserGateway;

describe('Update payment use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    userGateway = new UserGateway();
    updatePayment = new UpdatePayment(paymentGateway, userGateway);
  });

  it('should be able to update payment', async () => {
    const payment = await updatePayment.execute({
      id: '7',
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
