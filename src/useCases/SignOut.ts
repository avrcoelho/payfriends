import { UserRepositoryPort } from './ports/userRepository';

export class SignOut {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  execute(): void {
    this.userRepository.delete();
  }
}
