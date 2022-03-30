import { makeGetPayments } from '../getPayments';

describe('make get payments', () => {
  it('should be able to exists execute method', () => {
    expect(makeGetPayments()).toHaveProperty('execute');
  });
});
