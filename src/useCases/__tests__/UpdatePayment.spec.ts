import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { UpdatePayment } from '../UpdatePayment';
import { GetUser } from '../GetUser';

const paymentResponse = {
  userId: '7',
  id: '7',
  value: 700,
  title: 'test',
  date: '2022-03-20',
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
let getUser: GetUser;

describe('Update payment use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    userGateway = new UserGateway();
    getUser = new GetUser(userGateway);
    updatePayment = new UpdatePayment(paymentGateway, getUser);
  });

  it('should be able to update payment', async () => {
    const payment = await updatePayment.execute({
      id: '7',
      status: false,
      date: '2022-03-20',
      value: 700,
      userId: '7',
      title: 'test',
    });

    expect(payment).toHaveProperty('user');
  });
});
