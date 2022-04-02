import config from '@/shared/config.json';
import {
  CreateParams,
  GetParams,
  PaymentData,
  PaymentGatewayPort,
  UpdateParams,
  UpdateStatusParams,
} from '@/useCases/ports/paymentGateway';
import { Payment } from '@/entities/Payment';
import { HttpClient } from '../http/httpClient/HttpClient';

export class PaymentGateway extends HttpClient implements PaymentGatewayPort {
  private readonly paymentUrl = `${config.baseUrl}/payments`;

  async get({ userId, page, limit }: GetParams): Promise<PaymentData> {
    const { data, headers } = await this.getRequest<Payment[]>({
      url: this.paymentUrl,
      params: {
        'user.id': userId,
        _page: page,
        _limit: limit,
      },
    });
    return { data, total: Number(headers['x-total-count']) };
  }

  async getById(id: string): Promise<Payment> {
    const { data } = await this.getRequest<Payment>({
      url: `${this.paymentUrl}/${id}`,
    });
    return data;
  }

  async create(params: CreateParams): Promise<Payment> {
    const { data } = await this.postRequest<Payment>({
      url: this.paymentUrl,
      body: params,
    });
    return data;
  }

  async update(params: UpdateParams): Promise<Payment> {
    const { data } = await this.putRequest<Payment>({
      url: `${this.paymentUrl}/${params.id}`,
      body: params,
    });
    return data;
  }

  async updateStatus({ id, status }: UpdateStatusParams): Promise<Payment> {
    const { data } = await this.patchRequest<Payment>({
      url: `${this.paymentUrl}/${id}`,
      body: { status },
    });
    return data;
  }

  async deleteById(id: string): Promise<void> {
    await this.deleteRequest<void>({
      url: `${this.paymentUrl}/${id}`,
    });
  }
}
