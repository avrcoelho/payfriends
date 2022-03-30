import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { SignOut } from '../SignOut';

let signOut: SignOut;
let userRepository: UserRepository;

describe('Sign out use case', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    signOut = new SignOut(userRepository);
  });

  it('should be able to sign out', async () => {
    expect(() => signOut.execute()).not.toThrow();
  });
});
