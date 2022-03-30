import { Payment } from '@/entities/Payment';

export type GetParans = {
  userId: string;
  page: number;
  limit: number;
};

export type CreateParams = Exclude<Payment, 'id'>;

export interface PaymentGatewayPort {
  get(params: GetParans): Promise<Payment[]>;
  getById(id: string): Promise<Payment>;
  create(params: CreateParams): Promise<Payment>;
  update(params: Payment): Promise<Payment>;
  deleteById(id: string): Promise<void>;
}
