import { makeUpdatePaymentStatus } from '../updatePaymentStatus';

describe('make update payment status', () => {
  it('should be able to exists execute method', () => {
    expect(typeof makeUpdatePaymentStatus).toBe('function');
  });
});
