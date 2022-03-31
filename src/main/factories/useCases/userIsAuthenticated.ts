import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { UserIsAuthenticated } from '@/useCases/UserIsAuthenticated';

export const makeUserIsAuthenticated = () => {
  const userRepository = new UserRepository();
  return new UserIsAuthenticated(userRepository);
};
