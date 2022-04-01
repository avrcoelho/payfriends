import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { GetUserId } from '@/useCases/GetUserId';

export const makeGetUserId = () => {
  const userRepository = new UserRepository();
  return new GetUserId(userRepository);
};
