import { SignInParams, UserGatewayPort } from '@/useCases/ports/userGateway';
import config from '@/shared/config.json';
import { User } from '@/entities/User';
import { HttpClient } from '../http/httpClient/HttpClient';

export class UserGateway extends HttpClient implements UserGatewayPort {
  private readonly userUrl = `${config.baseUrl}/users`;

  async signIn(params: SignInParams): Promise<User> {
    const {
      data: [user],
    } = await this.getRequest<User[]>({
      url: this.userUrl,
      params,
    });
    return user;
  }

  async get(): Promise<User[]> {
    const { data } = await this.getRequest<User[]>({
      url: this.userUrl,
    });
    return data;
  }

  async getById(id: string): Promise<User> {
    const { data } = await this.getRequest<User>({
      url: `${this.userUrl}/${id}`,
    });
    return data;
  }
}
