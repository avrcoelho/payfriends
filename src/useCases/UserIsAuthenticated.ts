import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { UpdateParams } from './ports/paymentGateway';

export class UserIsAuthenticated {
  constructor(private readonly useRepository: UserRepository) {}

  execute(): boolean {
    return !!this.useRepository.getId();
  }
}
