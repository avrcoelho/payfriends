import { makeGetUserId } from '../getUserId';

describe('make get user id', () => {
  it('should be able to exists execute method', () => {
    expect(makeGetUserId()).toHaveProperty('execute');
  });
});
