import { makeUserIsAuthenticated } from '../userIsAuthenticated';

describe('make user is authenticated', () => {
  it('should be able to exists execute method', () => {
    expect(makeUserIsAuthenticated()).toHaveProperty('execute');
  });
});
