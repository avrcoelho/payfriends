import { UserRepository } from '../infrastructure/repositories/UserRepository';

export class GetUserId {
  constructor(private readonly useRepository: UserRepository) {}

  execute(): string | null {
    return this.useRepository.getId();
  }
}
