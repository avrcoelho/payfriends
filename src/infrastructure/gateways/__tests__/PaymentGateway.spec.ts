import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '../PaymentGateway';

const paymentResponse = {
  user: {
    id: '7',
  },
  id: '7',
  value: 700,
  timestamp: Date.now(),
  status: true,
};

const server = setupServer(
  rest.get(`${config.baseUrl}/payments`, (_, res, ctx) => {
    return res(ctx.json([paymentResponse]));
  }),
  rest.get(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
  rest.post(`${config.baseUrl}/payments`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
  rest.put(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
  rest.delete(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.status(202));
  }),
  rest.patch(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.json(paymentResponse));
  }),
);

let paymentGateway: PaymentGateway;

describe('PaymentGateway', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
  });

  it('should be able to get user payments', async () => {
    const paymentData = await paymentGateway.get({
      userId: '7',
      page: 1,
      limit: 5,
    });

    expect(paymentData.data).toHaveLength(1);
  });

  it('should be able to get payment', async () => {
    const payment = await paymentGateway.getById('7');

    expect(payment).toHaveProperty('id');
  });

  it('should be able to create payment', async () => {
    const payment = await paymentGateway.create(paymentResponse as any);

    expect(payment).toHaveProperty('id');
  });

  it('should be able to update payment', async () => {
    const payment = await paymentGateway.update(paymentResponse);

    expect(payment).toHaveProperty('id');
  });

  it('should be able to delete payment', async () => {
    await expect(paymentGateway.deleteById('7')).resolves.toBeUndefined();
  });

  it('should be able to update payment status by id', async () => {
    const payment = await paymentGateway.updateStatus({
      id: '7',
      status: true,
    });

    expect(payment).toHaveProperty('id');
  });
});
