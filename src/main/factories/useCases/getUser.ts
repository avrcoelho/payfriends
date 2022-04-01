import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetUser } from '@/useCases/GetUser';

export const makeGetUser = () => {
  const userGateway = new UserGateway();
  return new GetUser(userGateway);
};
