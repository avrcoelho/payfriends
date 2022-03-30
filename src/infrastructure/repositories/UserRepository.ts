import { UserRepositoryPort } from '@/useCases/ports/userRepository';
import { LocalStorage } from '../storage/LocalStorage';

export class UserRepository extends LocalStorage implements UserRepositoryPort {
  private readonly userIdKey = '@userId';

  saveId(id: string): void {
    this.saveData(this.userIdKey, id);
  }

  getId(): string | null {
    return this.getData<string>(this.userIdKey);
  }

  delete(): void {
    this.deleteData(this.userIdKey);
  }
}
