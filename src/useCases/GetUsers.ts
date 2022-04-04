import { User } from '@/entities/User';
import { UserGatewayPort } from './ports/userGateway';

export class GetUsers {
  constructor(private readonly userGateway: UserGatewayPort) {}

  async execute(userName?: string): Promise<User[]> {
    return this.userGateway.get(userName);
  }
}
