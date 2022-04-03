import { User } from '@/entities/User';

export type SignInParams = {
  email: string;
  password: string;
};

export interface UserGatewayPort {
  signIn(parans: SignInParams): Promise<User>;
  get(): Promise<User[]>;
  getById(id: string): Promise<User>;
}
