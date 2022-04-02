import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { UpdatePaymentStatus } from '../UpdatePaymentStatus';
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
  rest.patch(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
  rest.get(`${config.baseUrl}/users/:id`, (_, res, ctx) => {
    return res(ctx.json(userResponse));
  }),
);

let updatePaymentStatus: UpdatePaymentStatus;
let paymentGateway: PaymentGateway;
let userGateway: UserGateway;
let getUser: GetUser;

describe('Update payment status use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    userGateway = new UserGateway();
    getUser = new GetUser(userGateway);
    updatePaymentStatus = new UpdatePaymentStatus(paymentGateway, getUser);
  });

  it('should be able to update payment', async () => {
    const payment = await updatePaymentStatus.execute({
      id: '7',
      status: false,
    });

    expect(payment).toHaveProperty('user');
  });
});
