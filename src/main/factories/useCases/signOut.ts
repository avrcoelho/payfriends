import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { SignOut } from '@/useCases/SignOut';

export const makeSignOut = () => {
  const userRepository = new UserRepository();
  return new SignOut(userRepository);
};
