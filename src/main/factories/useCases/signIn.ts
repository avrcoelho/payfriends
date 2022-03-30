import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { SignIn } from '@/useCases/SignIn';

export const makeSignIn = () => {
  const userGateway = new UserGateway();
  const userRepository = new UserRepository();
  return new SignIn(userGateway, userRepository);
};
