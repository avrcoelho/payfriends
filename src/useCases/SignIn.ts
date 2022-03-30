import { User } from '@/entities/User';
import { SignInParams, UserGatewayPort } from './ports/userGateway';
import { UserRepositoryPort } from './ports/userRepository';

export class SignIn {
  constructor(
    private readonly userGateway: UserGatewayPort,
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(params: SignInParams): Promise<User> {
    const user = await this.userGateway.signIn(params);
    this.userRepository.saveId(user.id);
    return user;
  }
}
