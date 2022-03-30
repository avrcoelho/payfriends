import { makeSignOut } from '../signOut';

describe('make sign out', () => {
  it('should be able to exists execute method', () => {
    expect(makeSignOut()).toHaveProperty('execute');
  });
});
