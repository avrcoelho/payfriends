import { makeGetPayment } from '../getPayment';

describe('make get payment', () => {
  it('should be able to exists execute method', () => {
    expect(makeGetPayment()).toHaveProperty('execute');
  });
});
