import { makeGetUsers } from '../getUsers';

describe('make get users', () => {
  it('should be able to exists execute method', () => {
    expect(makeGetUsers()).toHaveProperty('execute');
  });
});
