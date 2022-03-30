import { makeDeletePayment } from '../deletePayment';

describe('make delete payment', () => {
  it('should be able to exists execute method', () => {
    expect(makeDeletePayment()).toHaveProperty('execute');
  });
});
