import { User } from '@/entities/User';
import { UserGatewayPort } from './ports/userGateway';

export class GetUser {
  constructor(private readonly userGateway: UserGatewayPort) {}

  async execute(userId: string): Promise<User> {
    return this.userGateway.getById(userId);
  }
}
