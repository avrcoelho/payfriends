export interface UserRepositoryPort {
  saveId(id: string): void;
  getId(): string | null;
  delete(): void;
}
