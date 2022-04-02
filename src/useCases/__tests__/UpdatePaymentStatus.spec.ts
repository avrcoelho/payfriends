import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { UpdatePaymentStatus } from '../UpdatePaymentStatus';

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
  timestamp: Date.now(),
  status: true,
};

const server = setupServer(
  rest.patch(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
);

let updatePaymentStatus: UpdatePaymentStatus;
let paymentGateway: PaymentGateway;

describe('Update payment status use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    updatePaymentStatus = new UpdatePaymentStatus(paymentGateway);
  });

  it('should be able to update payment', async () => {
    const payment = await updatePaymentStatus.execute({
      id: '7',
      status: false,
    });

    expect(payment).toHaveProperty('user');
  });
});
