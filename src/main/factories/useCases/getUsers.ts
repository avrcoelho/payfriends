import { UserGateway } from '@/infrastructure/gateways/UserGateway';
import { GetUsers } from '@/useCases/GetUsers';

export const makeGetUsers = () => {
  const userGateway = new UserGateway();
  return new GetUsers(userGateway);
};
