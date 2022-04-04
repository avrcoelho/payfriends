import { v4 as uuidv4 } from 'uuid';

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
import { PaymentMapper } from './mappers/PaymentMapper';

export class PaymentGateway extends HttpClient implements PaymentGatewayPort {
  private readonly paymentUrl = `${config.baseUrl}/payments`;

  async get({
    page,
    limit,
    searchByUserName = '',
  }: GetParams): Promise<PaymentData> {
    const { data, headers } = await this.getRequest<Payment[]>({
      url: this.paymentUrl,
      params: {
        _expand: 'user',
        _page: page,
        _limit: limit,
        '_userPayment.name': searchByUserName,
      },
    });
    return { data, total: Number(headers['x-total-count']) };
  }

  async getById(id: string): Promise<Payment> {
    const { data } = await this.getRequest<Payment>({
      url: `${this.paymentUrl}/${id}`,
      params: {
        _expand: 'user',
      },
    });
    return data;
  }

  async create(params: CreateParams): Promise<Payment> {
    const id = uuidv4();
    const parsedPayment = PaymentMapper.toDto(params);
    const { data } = await this.postRequest<Payment>({
      url: this.paymentUrl,
      body: { ...parsedPayment, id },
      params: {
        _expand: 'user',
      },
    });
    return data;
  }

  async update(params: UpdateParams): Promise<Payment> {
    const parsedPayment = PaymentMapper.toDto(params);
    const { data } = await this.putRequest<Payment>({
      url: `${this.paymentUrl}/${params.id}`,
      body: parsedPayment,
      params: {
        _expand: 'user',
      },
    });
    return data;
  }

  async updateStatus({ id, status }: UpdateStatusParams): Promise<Payment> {
    const { data } = await this.patchRequest<Payment>({
      url: `${this.paymentUrl}/${id}`,
      body: { status },
      params: {
        _expand: 'user',
      },
    });
    return data;
  }

  async deleteById(id: string): Promise<void> {
    await this.deleteRequest<void>({
      url: `${this.paymentUrl}/${id}`,
    });
  }
}
