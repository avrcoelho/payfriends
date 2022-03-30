import { makeUpdatePayment } from '../updatePayment';

describe('make update payment', () => {
  it('should be able to exists execute method', () => {
    expect(makeUpdatePayment()).toHaveProperty('execute');
  });
});
