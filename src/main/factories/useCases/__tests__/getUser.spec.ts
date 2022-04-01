import { makeGetUser } from '../getUser';

describe('make get user', () => {
  it('should be able to exists execute method', () => {
    expect(makeGetUser()).toHaveProperty('execute');
  });
});
