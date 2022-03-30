import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from '@/shared/config.json';
import { PaymentGateway } from '@/infrastructure/gateways/PaymentGateway';
import { DeletePayment } from '../DeletePayment';

const server = setupServer(
  rest.delete(`${config.baseUrl}/payments/:id`, (_, res, ctx) => {
    return res(ctx.status(200));
  }),
);

let deletePayment: DeletePayment;
let paymentGateway: PaymentGateway;

describe('Delete payment use case', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  beforeEach(() => {
    paymentGateway = new PaymentGateway();
    deletePayment = new DeletePayment(paymentGateway);
  });

  it('should be able to delete payment', async () => {
    await expect(deletePayment.execute('7')).resolves.toBeUndefined();
  });
});
