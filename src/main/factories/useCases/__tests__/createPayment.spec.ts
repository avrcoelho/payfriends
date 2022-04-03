import { makeCreatePayment } from '../createPayment';

describe('make create payment', () => {
  it('should be able to exists execute method', () => {
    expect(typeof makeCreatePayment).toBe('function');
  });
});
