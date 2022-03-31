import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { UserIsAuthenticated } from '../UserIsAuthenticated';

let userIsAuthenticated: UserIsAuthenticated;
let userRepository: UserRepository;

describe('User is authenticated use case', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    userIsAuthenticated = new UserIsAuthenticated(userRepository);
  });

  it('should not be able to user authenticated ', () => {
    const isAuthenticated = userIsAuthenticated.execute();

    expect(isAuthenticated).toBeFalsy();
  });
});
