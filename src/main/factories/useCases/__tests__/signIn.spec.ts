import { makeSignIn } from '../signIn';

describe('make sign in', () => {
  it('should be able to exists execute method', () => {
    expect(makeSignIn()).toHaveProperty('execute');
  });
});
