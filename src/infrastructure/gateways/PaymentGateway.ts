import config from '@/shared/config.json';
import {
  CreateParams,
  GetParans,
  PaymentGatewayPort,
} from '@/useCases/ports/paymentGateway';
import { Payment } from '@/entities/Payment';
import { HttpClient } from '../http/httpClient/HttpClient';

export class PaymentGateway extends HttpClient implements PaymentGatewayPort {
  private readonly paymentUrl = `${config.baseUrl}/payments`;
  private readonly userUrl = `${config.baseUrl}/users`;

  async get({ userId, page, limit }: GetParans): Promise<Payment[]> {
    const { data } = await this.getRequest<Payment[]>({
      url: `${this.userUrl}/${userId}/payments`,
      params: {
        page,
        limit,
      },
    });
    return data;
  }

  async getById(id: string): Promise<Payment> {
    const { data } = await this.getRequest<Payment>({
      url: `${this.paymentUrl}/${id}`,
    });
    return data;
  }

  async create(params: CreateParams): Promise<Payment> {
    const { data } = await this.postRequest<Payment>({
      url: `${this.userUrl}/${params.user.id}/payments`,
      body: params,
    });
    return data;
  }

  async update(params: Payment): Promise<Payment> {
    const { data } = await this.putRequest<Payment>({
      url: `${this.paymentUrl}/${params.id}`,
      body: params,
    });
    return data;
  }

  async deleteById(id: string): Promise<void> {
    await this.deleteRequest<void>({
      url: `${this.paymentUrl}/${id}`,
    });
  }
}
